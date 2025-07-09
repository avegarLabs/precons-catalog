import { Recurso } from "./resource";

export interface SemiNormas {
    semi:   string;
    insumo: string;
    normas: number;
    usos:   number;
}

export interface RengNormas {
    renglon:   string;
    insumo: string;
    norma: number;
    usos:   number;
}


export interface SemiNormasDTO {
    insumo: Recurso;
    normas: number;
    usos:   number;
}


