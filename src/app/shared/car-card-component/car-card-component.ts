import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {CarListing} from '../../Interfaces/car-interface';

@Component({
  selector: 'app-car-card-component',
  imports: [CommonModule],
  templateUrl: './car-card-component.html',
  styleUrl: './car-card-component.scss',
})
export class CarCardComponent {
  @Input() car!: CarListing;
}
