import { Component, input, OnInit } from '@angular/core';
import { structureDto } from '../../../core/interfaces/normas-juego';

@Component({
  selector: 'app-juego-struct',
  templateUrl: './juego-struct.component.html',
 })
export class JuegoStructComponent {

   struct = input.required<structureDto[]>();

}
