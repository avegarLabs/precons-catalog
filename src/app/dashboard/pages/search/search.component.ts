import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { BotService } from '../../../core/services/bot.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  styleUrls: ['./search.component.css'],
})
export default class SearchComponent {
  botService = inject(BotService);
  private iconLibrary = inject(FaIconLibrary);
  question: string = '';

  constructor(private sanitizer: DomSanitizer) {
     this.iconLibrary.addIcons(faRobot);
  }

 
  getIconName(icon: string) {
    return icon.replace('fa', '').toLowerCase();
  }

  handleSubmit() {
    const trimmed = this.question.trim();
    if (!trimmed) return;
    this.botService.askQuestion(trimmed);
    this.question = '';
  }


  formatAnswer(): SafeHtml {
    // Verifica si existe la respuesta
    if (!this.botService.response()?.answer) {
      return this.sanitizer.bypassSecurityTrustHtml(
        '<p>No se recibió respuesta del chatbot</p>'
      );
    }

    // Procesa el texto
    let formatted = this.botService.response()?.answer
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    return this.sanitizer.bypassSecurityTrustHtml(`<p>${formatted}</p>`);
  }

}
