export interface Recurso {
    codigo:                string;
    Descripcion:           string;
    Tipo:                  string;
    um:                    string;
    Precio:                number;
    Peso:                  number;
    "Costo de materiales": number;
    "Costo de mano obra":  number;
    "Costo de equipos":    number;
    "Horas operario":      number;
    "Horas ayudante":      number;
    "Horas equipo":        number;
    "Tipo de MO":          string;
    Cemento:               number;
    Aridos:                number;
    Asfalto:               number;
    Carga:                 number;
    Prefabricado:          number;
    GrupoEscala:           string;
    Especificacion:        null;
    INDICE1:               number;
    INDICE2:               null;
    Precio_O:              number;
    Precio_BR19:           null;
    CodigoSustituto:       null;
}
