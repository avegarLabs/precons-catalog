import { Injectable, signal } from '@angular/core';
import { DocsBotResponse } from '../interfaces/docsbot-response';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BotService {
 private apiUrl = 'https://api.docsbot.ai/teams/MUhRN7RKW66H30JQ0WJL/bots/ZnlsEPvMZBrk9BLiMsry/chat';

  readonly loading = signal(false);
  readonly response = signal<DocsBotResponse | null>(null);
  readonly error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  askQuestion(question: string) {
    this.loading.set(true);
    this.response.set(null);
    this.error.set(null);

    this.http.post<DocsBotResponse>(this.apiUrl, { question }).subscribe({
      next: (res) => this.response.set(res),
      error: (err) => {
        this.error.set('Ocurrió un error al consultar el bot.');
        console.error(err);
      },
      complete: () => this.loading.set(false)
    });
  }

}
