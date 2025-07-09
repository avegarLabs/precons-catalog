import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recurso } from '../interfaces/resource';
import { catchError, Observable, of, tap } from 'rxjs';
import { Renglones } from '../interfaces/renglon';
import { Apertura } from '../interfaces/apertura';
import { Structure, structureDto } from '../interfaces/normas-juego';
import {
  RengNormas,
  SemiNormas,
  SemiNormasDTO,
} from '../interfaces/semi-normas';
import { Grupos } from '../interfaces/grupos';


@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  recuros = signal<Recurso[]>([]);
  recurosFilter = signal<Recurso[]>([]);
  renglon = signal<Renglones[]>([]);
  apertura = signal<Apertura | undefined>(undefined);
  juegoNorm = signal<structureDto[]>([]);
  semiNorm = signal<SemiNormasDTO[]>([]);
  renglonNorm = signal<SemiNormasDTO[]>([]);
  superNorm = signal<Grupos[]>([]);
  grupoNorm = signal<Grupos[]>([]);
  subNorm = signal<Grupos[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  sumUrl = 'assets/resources/recursos.json';
  renUrl = 'assets/resources/renglones_variantes.json';
  desgURL = 'assets/resources/equipoApertura.json';
  normasJuegoURL = 'assets/resources/datos_juegos.json';
  normasSemiURL = 'assets/resources/semi_normas.json';
  normasRenglonURL = 'assets/resources/renglon_normas.json';
  grupoURL = 'assets/resources/grupos.json';

  constructor(private http: HttpClient) {}

  loadRecursos() {
    this.loading.set(true);
    this.http
      .get<Recurso[]>(this.sumUrl)
      .pipe(
        catchError(() => {
          this.error.set('Error loading patient data');
          return of([]);
        })
      )
      .subscribe((data) => {
        const filter = data.filter((item) => item.Tipo === '1');
        this.recuros.set(filter);
        this.loading.set(false);
      });
  }

  loadRecursosFilter() {
    this.loading.set(true);
    this.http
      .get<Recurso[]>(this.sumUrl)
      .pipe(
        catchError(() => {
          this.error.set('Error loading patient data');
          return of([]);
        })
      )
      .subscribe((data) => {
        this.recurosFilter.set(data);
        this.loading.set(false);
      });
  }

  loadMano() {
    this.loading.set(true);
    this.http
      .get<Recurso[]>(this.sumUrl)
      .pipe(
        catchError(() => {
          this.error.set('Error loading patient data');
          return of([]);
        })
      )
      .subscribe((data) => {
        const filter = data.filter((item) => item.Tipo === '2');
        this.recuros.set(filter);
        this.loading.set(false);
      });
  }

  loadEquipos() {
    this.loading.set(true);
    this.http
      .get<Recurso[]>(this.sumUrl)
      .pipe(
        catchError(() => {
          this.error.set('Error loading patient data');
          return of([]);
        })
      )
      .subscribe((data) => {
        const filter = data.filter((item) => item.Tipo === '3');
        this.recuros.set(filter);
        this.loading.set(false);
      });
  }

  loadJuego() {
    this.loading.set(true);
    this.http
      .get<Recurso[]>(this.sumUrl)
      .pipe(
        catchError(() => {
          this.error.set('Error loading patient data');
          return of([]);
        })
      )
      .subscribe((data) => {
        const filter = data.filter((item) => item.Tipo === 'J');
        this.recuros.set(filter);
        this.loading.set(false);
      });
  }

  loadSemi() {
    this.loading.set(true);
    this.http
      .get<Recurso[]>(this.sumUrl)
      .pipe(
        catchError(() => {
          this.error.set('Error loading patient data');
          return of([]);
        })
      )
      .subscribe((data) => {
        const filter = data.filter((item) => item.Tipo === 'S');
        this.recuros.set(filter);
        this.loading.set(false);
      });
  }

 loadRenglones(): Observable<Renglones[]> {
  this.loading.set(true);
  return this.http.get<Renglones[]>(this.renUrl).pipe(
    catchError(() => {
      this.error.set('Error loading patient data');
      return of([]);
    }),
    tap((data) => {
      this.renglon.set(data);
      this.loading.set(false);
    })
  );
}

  findAperturaByCode(code: string) {
    this.loading.set(true);
    this.http
      .get<Apertura[]>(this.desgURL)
      .pipe(
        catchError(() => {
          this.error.set('Error loading patient data');
          return of([]);
        })
      )
      .subscribe((data) => {
        const filter = data.find((item) => item.codigo === code);
        this.apertura.set(filter);
        this.loading.set(false);
      });
  }

  findJuegoStructByCode(code: string) {
    this.loading.set(true);
    this.http
      .get<Structure[]>(this.normasJuegoURL)
      .pipe(
        catchError(() => {
          this.error.set('Error loading patient data');
          return of([]);
        })
      )
      .subscribe((data) => {
        const filter = data.filter((item) => item.juego_productos === code);
        const dataStruct: structureDto[] = filter.map((item) => ({
          recurso: this.findRecursoByCode(item.recurso),
          norma: Number(item.Norma),
        }));
        this.juegoNorm.set(dataStruct);
        this.loading.set(false);
      });
  }

  findSemiStructByCode(code: string) {
    this.loading.set(true);
    this.http
      .get<SemiNormas[]>(this.normasSemiURL)
      .pipe(
        catchError(() => {
          this.error.set('Error loading patient data');
          return of([]);
        })
      )
      .subscribe((data) => {
        const filter = data.filter((item) => item.semi === code);
        const dataStruct: SemiNormasDTO[] = filter.map((item) => ({
          insumo: this.findRecursoByCode(item.insumo),
          normas: item.normas,
          usos: item.usos,
        }));
        this.semiNorm.set(dataStruct);
        this.loading.set(false);
      });
  }

  findRenglonStructByCode(code: string) {
    this.loading.set(true);
    this.http
      .get<RengNormas[]>(this.normasRenglonURL)
      .pipe(
        catchError(() => {
          this.error.set('Error loading patient data');
          return of([]);
        })
      )
      .subscribe((data) => {
        const filter = data.filter((item) => item.renglon === code);
        const dataStruct: SemiNormasDTO[] = filter.map((item) => ({
          insumo: this.findRecursoByCode(item.insumo),
          normas: item.norma,
          usos: item.usos,
        }));
        this.semiNorm.set(dataStruct);
        console.log(dataStruct);
        this.loading.set(false);
      });
  }

  findRecursoByCode(code: string): Recurso {
    const recursos = this.recurosFilter();
    return recursos.find((item) => item.codigo === code);
  }

  filterSuperGroup() {
    this.loading.set(true);
    this.http
      .get<Grupos[]>(this.grupoURL)
      .pipe(
        catchError(() => {
          this.error.set('Error loading patient data');
          return of([]);
        })
      )
      .subscribe((data) => {
        const filter = data.filter((item) => item.Tipo === '1');
        this.superNorm.set(filter);
        this.loading.set(false);
      });
  }

  filterGroup(code: string) {
    this.loading.set(true);
    this.http
      .get<Grupos[]>(this.grupoURL)
      .pipe(
        catchError(() => {
          this.error.set('Error loading patient data');
          return of([]);
        })
      )
      .subscribe((data) => {
        const filter = data.filter(
          (item) =>
            item.Tipo === '2' && item.Codigo.startsWith(code.substring(0, 2))
        );
        this.grupoNorm.set(filter);
        this.loading.set(false);
      });
  }

  filterSubGroup(code: string) {
    this.loading.set(true);
    this.http
      .get<Grupos[]>(this.grupoURL)
      .pipe(
        catchError(() => {
          this.error.set('Error loading patient data');
          return of([]);
        })
      )
      .subscribe((data) => {
        const filter = data.filter(
          (item) =>
            item.Tipo === '3' && item.Codigo.startsWith(code.substring(0, 3))
        );
        this.subNorm.set(filter);
        this.loading.set(false);
      });
    }
 
}
