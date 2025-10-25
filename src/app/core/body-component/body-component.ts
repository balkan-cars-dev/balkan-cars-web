import { Component } from '@angular/core';
import { CarCardComponent } from '../../shared/car-card-component/car-card-component';
import { FiltersComponent } from '../../shared/filters-component/filters-component';

@Component({
  selector: 'app-body-component',
  imports: [CarCardComponent, FiltersComponent],
  templateUrl: './body-component.html',
  styleUrl: './body-component.scss',
})
export class BodyComponent {
  onCarSearch(filters: any) {
    console.log('Search filters:', filters);
  }
}
