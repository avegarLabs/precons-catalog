import { Recurso } from "./resource";


export interface Structure {
  juego_productos: string;
  recurso: string;
  Norma: number;
}

export interface structureDto {
  recurso: Recurso;
  norma: number;
}
