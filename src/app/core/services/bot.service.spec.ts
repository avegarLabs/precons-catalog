/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BotService } from './bot.service';

describe('Service: Bot', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BotService]
    });
  });

  it('should ...', inject([BotService], (service: BotService) => {
    expect(service).toBeTruthy();
  }));
});
