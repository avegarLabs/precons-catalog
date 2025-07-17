export interface DocsBotResponse {
    answer:      string;
    couldAnswer: boolean;
    sources:     Source[];
    history:     Array<string[]>;
    id:          string;
}

export interface Source {
    type:    string;
    title:   string;
    url:     string | null;
    page:    number;
    content: any;
    used:    boolean;
}
