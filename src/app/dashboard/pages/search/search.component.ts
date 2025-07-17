import { CommonModule, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { BotService } from '../../../core/services/bot.service';

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

  constructor() {
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
}
