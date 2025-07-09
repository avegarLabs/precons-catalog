import { Component, inject, input, OnInit } from '@angular/core';
import { Apertura } from '../../../core/interfaces/apertura';
import { ResourceService } from '../../../core/services/resource.service';

@Component({
  selector: 'app-apertura',
  templateUrl: './apertura.component.html',
})
export class AperturaComponent implements OnInit {
 
  apertura = input.required<Apertura>();
 
  ngOnInit(): void {
   
  }

  

}
