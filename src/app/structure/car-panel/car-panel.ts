import {Component, inject} from '@angular/core';
import { CarCardComponent } from '../../shared/car-card-component/car-card-component';
import { FiltersComponent } from '../../shared/filters-component/filters-component';
import {CarsService} from '../../services/cars-service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-car-panel',
  imports: [CarCardComponent, FiltersComponent, AsyncPipe],
  templateUrl: './car-panel.html',
  styleUrl: './car-panel.scss',
})
export class CarPanel {
  private carService = inject(CarsService);
  cars$ = this.carService.getAllCars();



  onCarSearch(filters: any) {
    console.log('Search filters:', filters);
  }
}
