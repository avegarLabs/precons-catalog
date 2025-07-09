import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ResourceService } from '../../../core/services/resource.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faLayerGroup
 } from '@fortawesome/free-solid-svg-icons';
import { SemiRengNormaComponent } from '../../components/semi-reng-norma/semi-reng-norma.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-semielaborados',
  imports: [MatPaginatorModule, FontAwesomeModule, MatExpansionModule, SemiRengNormaComponent, CommonModule, FormsModule],
  templateUrl: './semielaborados.component.html',
})
export default class SemielaboradosComponent {

 service = inject(ResourceService);
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 15, 25];

    filtro: string = '';
  
  private iconLibrary = inject(FaIconLibrary);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(){
    this.iconLibrary.addIcons(faLayerGroup);
    this.service.loadRecursosFilter();
    this.service.loadSemi();
  }

  getIconName(icon: string) {
    return icon.replace('fa', '').toLowerCase();
  }

   get paginatedRecursos() {
    const start = this.pageIndex * this.pageSize;
    return this.recursosFiltrados.slice(start, start + this.pageSize);
  }
  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }


   getDesgloseSemi(code: string) {
    this.service.findSemiStructByCode(code);
  }

   get recursosFiltrados() {
    const query = this.filtro.trim().toLowerCase();
    const recursos = this.service.recuros();

    if (!query) return recursos;

    return recursos.filter(
      (item) =>
        item.codigo.toLowerCase().includes(query) ||
        item.Descripcion.toLowerCase().includes(query)
    );
  }

}
