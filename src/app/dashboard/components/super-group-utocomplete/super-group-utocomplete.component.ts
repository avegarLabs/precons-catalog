import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ResourceService } from '../../../core/services/resource.service';
import { Grupos } from '../../../core/interfaces/grupos';
import { Observable, combineLatest, map, of, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-super-group-utocomplete',
  templateUrl: './super-group-utocomplete.component.html',
  imports: [
    CommonModule,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
})
export class SuperGroupUtocompleteComponent implements OnInit {
  private grupoService = inject(ResourceService);

  searchControl = new FormControl<string | Grupos>('');
  filteredOptions!: Observable<Grupos[]>;

  searchGrupControl = new FormControl<string | Grupos>('');
  filteredGrupOptions!: Observable<Grupos[]>;

  searchSubControl = new FormControl<string | Grupos>('');
  filteredSubOptions!: Observable<Grupos[]>;

  loading = this.grupoService.loading;
  error = this.grupoService.error;
  selectedGrupo = signal<Grupos | null>(null);
  selectedGrupo1 = signal<Grupos | null>(null);
  selectedGrupo2 = signal<Grupos | null>(null);

  @Output() seccionSelected = new EventEmitter<string>();
  @Output() capituloSelected = new EventEmitter<string>();
  @Output() subcapituloSelected = new EventEmitter<string>();

  grupoNorm$ = toObservable(this.grupoService.grupoNorm);
  subNorm$ = toObservable(this.grupoService.subNorm);

  ngOnInit() {
    this.grupoService.filterSuperGroup();

    // Secciones
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const input = typeof value === 'string' ? value : value?.Descripcion;
        return input
          ? this._filter(input)
          : this.grupoService.superNorm()?.slice() || [];
      })
    );

    // Capítulos
    this.filteredGrupOptions = combineLatest([
      this.searchGrupControl.valueChanges.pipe(startWith('')),
      this.grupoNorm$,
    ]).pipe(
      map(([value, grupoNorm]) => {
        const input = typeof value === 'string' ? value : value?.Descripcion;
        return input
          ? this._filter1(input, grupoNorm)
          : grupoNorm?.slice() || [];
      })
    );

    // Subcapítulos
    this.filteredSubOptions = combineLatest([
      this.searchSubControl.valueChanges.pipe(startWith('')),
      this.subNorm$,
    ]).pipe(
      map(([value, subNorm]) => {
        const input = typeof value === 'string' ? value : value?.Descripcion;
        return input ? this._filter2(input, subNorm) : subNorm?.slice() || [];
      })
    );
  }

  private _filter(value: string): Grupos[] {
    const filterValue = value.toLowerCase();
    return this.grupoService
      .superNorm()
      .filter(
        (item) =>
          item.Codigo.toLowerCase().includes(filterValue) ||
          item.Descripcion.toLowerCase().includes(filterValue)
      );
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const grupo = event.option.value as Grupos;
    this.selectedGrupo.set(grupo);

    this.searchGrupControl.setValue('', { emitEvent: true });
    this.selectedGrupo1.set(null);

    this.searchSubControl.setValue('', { emitEvent: true });
    this.selectedGrupo2.set(null);

    this.searchControl.setValue(this.displayFn(grupo));
    this.grupoService.filterGroup(grupo.Codigo);
    this.seccionSelected.emit(grupo.Codigo);
  }

  displayFn(grupo: Grupos): string {
    return grupo && grupo.Descripcion
      ? `${grupo.Codigo} - ${grupo.Descripcion}`
      : '';
  }

  private _filter1(value: string, list: Grupos[]): Grupos[] {
    const filterValue = value.toLowerCase();
    return list.filter(
      (item) =>
        item.Codigo.toLowerCase().includes(filterValue) ||
        item.Descripcion.toLowerCase().includes(filterValue)
    );
  }

  onOptionSelectedGrup(event: MatAutocompleteSelectedEvent): void {
    const grupo1 = event.option.value as Grupos;
    this.selectedGrupo1.set(grupo1);

    this.searchSubControl.setValue('', { emitEvent: true });
    this.selectedGrupo2.set(null);

    this.searchGrupControl.setValue(this.displayFn1(grupo1));
    this.grupoService.filterSubGroup(grupo1.Codigo);
    this.capituloSelected.emit(grupo1.Codigo);
  }

  displayFn1(grupo: Grupos): string {
    return grupo && grupo.Descripcion
      ? `${grupo.Codigo} - ${grupo.Descripcion}`
      : '';
  }

  private _filter2(value: string, list: Grupos[]): Grupos[] {
    const filterValue = value.toLowerCase();
    return list.filter(
      (item) =>
        item.Codigo.toLowerCase().includes(filterValue) ||
        item.Descripcion.toLowerCase().includes(filterValue)
    );
  }

  onOptionSelectedSub(event: MatAutocompleteSelectedEvent): void {
    const grupo2 = event.option.value as Grupos;
    this.selectedGrupo2.set(grupo2);
    this.searchSubControl.setValue(this.displayFn2(grupo2));
    this.subcapituloSelected.emit(grupo2.Codigo);
  }

  displayFn2(grupo: Grupos): string {
    return grupo && grupo.Descripcion
      ? `${grupo.Codigo} - ${grupo.Descripcion}`
      : '';
  }
}
