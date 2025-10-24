import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface CarListing {
  id: number;
  make: string;
  model: string;
  details: string;
  priceEur: number;
  priceBgn: number;
  mileage: number;
  region: string;
  date: string; // example: '10:15 часа на 24.10.'
  imageUrl: string;
  badge?: 'BEST' | 'TOP' | string;
}

@Component({
  selector: 'app-car-card-component',
  imports: [CommonModule],
  templateUrl: './car-card-component.html',
  styleUrl: './car-card-component.scss',
})
export class CarCardComponent {
  @Input() car!: CarListing;
}
