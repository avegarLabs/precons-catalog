import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ResourceService } from '../../../core/services/resource.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { AperturaComponent } from '../../components/apertura/apertura.component';
import { Apertura } from '../../../core/interfaces/apertura';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-equipments',
  imports: [
    MatPaginatorModule,
    FontAwesomeModule,
    MatExpansionModule,
    AperturaComponent,
    CommonModule,FormsModule
  ],
  templateUrl: './equipments.component.html',
})
export default class EquipmentsComponent {
  service = inject(ResourceService);
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 15, 25];
  selectedApertura = signal<Apertura | undefined>(undefined);
  loadingApertura = signal(false);
  errorApertura = signal('');

  filtro: string = '';

  private iconLibrary = inject(FaIconLibrary);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.iconLibrary.addIcons(faTruck);
    this.service.loadEquipos();
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

  getDesglose(code: string) {
    this.service.findAperturaByCode(code);
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
