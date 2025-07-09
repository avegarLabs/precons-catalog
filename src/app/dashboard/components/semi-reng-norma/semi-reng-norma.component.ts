import { Component, input, OnInit } from '@angular/core';
import { SemiNormasDTO } from '../../../core/interfaces/semi-normas';

@Component({
  selector: 'app-semi-reng-norma',
  templateUrl: './semi-reng-norma.component.html',
 })
export class SemiRengNormaComponent  {

   struct = input.required<SemiNormasDTO[]>();
   
 

}
