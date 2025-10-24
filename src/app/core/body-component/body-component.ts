import { Component } from '@angular/core';
import { CarCardComponent } from '../../car-card-component/car-card-component';

@Component({
  selector: 'app-body-component',
  imports: [CarCardComponent],
  templateUrl: './body-component.html',
  styleUrl: './body-component.scss',
})
export class BodyComponent {}
