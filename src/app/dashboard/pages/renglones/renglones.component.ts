import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ResourceService } from '../../../core/services/resource.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { SemiRengNormaComponent } from '../../components/semi-reng-norma/semi-reng-norma.component';
import { SuperGroupUtocompleteComponent } from '../../components/super-group-utocomplete/super-group-utocomplete.component';
import { Renglones } from '../../../core/interfaces/renglon';

@Component({
  selector: 'app-renglones',
  imports: [
    MatPaginatorModule,
    FontAwesomeModule,
    MatExpansionModule,
    SuperGroupUtocompleteComponent,
    SemiRengNormaComponent
  ],
  templateUrl: './renglones.component.html',
})
export default class RenglonesComponent {
  service = inject(ResourceService);
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 15, 25];

  filteredRenglones: Renglones[] = [];

  selectedSeccion: string | null = null;
  selectedCapitulo: string | null = null;
  selectedSubcapitulo: string | null = null;

  private iconLibrary = inject(FaIconLibrary);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor() {
    this.iconLibrary.addIcons(faTags);
    this.service.loadRecursosFilter();
    this.service.loadRenglones().subscribe({
      next: (data) => {
        this.filteredRenglones = [...data];
      },
      error: (err) => console.error('Error loading renglones', err),
    });
  }

  getIconName(icon: string) {
    return icon.replace('fa', '').toLowerCase();
  }

  get paginatedRecursos() {
    const start = this.pageIndex * this.pageSize;
    return this.filteredRenglones.slice(start, start + this.pageSize);
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  getDesgloseRenglon(code: string) {
    this.service.findRenglonStructByCode(code);
  }

  onSeccionSelected(codigo: string) {
    this.selectedSeccion = codigo;
    this.selectedCapitulo = null;
    this.selectedSubcapitulo = null;
    this.filterRenglones();
  }

  onCapituloSelected(codigo: string) {
    this.selectedCapitulo = codigo;
    this.selectedSubcapitulo = null;
    this.filterRenglones();
  }

  onSubcapituloSelected(codigo: string) {
    this.selectedSubcapitulo = codigo;
    this.filterRenglones();
  }

  getFilterCode() {
    if (this.selectedSubcapitulo)
      return this.selectedSubcapitulo.substring(0, 4);
    if (this.selectedCapitulo) return this.selectedCapitulo.substring(0, 3);
    if (this.selectedSeccion) return this.selectedSeccion.substring(0, 2);
    return null;
  }

  filterRenglones() {
    const filterCode = this.getFilterCode();

    if (filterCode) {
      this.filteredRenglones = this.service
        .renglon()
        .filter((item: Renglones) => item.codigo.startsWith(filterCode));
    } else {
      this.filteredRenglones = [...this.service.renglon()];
    }

    this.pageIndex = 0;
  }
}
