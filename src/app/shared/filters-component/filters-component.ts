import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarListing } from '../../Interfaces/car-interface';
import { DefinedCarsService } from '../../services/defined-cars-service';

@Component({
  selector: 'app-filters-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters-component.html',
  styleUrl: './filters-component.scss',
})
export class FiltersComponent implements OnInit {
  @Output() search = new EventEmitter<any>();

  cars: CarListing[] = [];          // original (all cars you already fetched once)
  filteredCars: CarListing[] = [];  // what you render

  brands: string[] = ['Всички'];
  fuels = ['All', 'PETROL', 'DISEL', 'HYBRID', 'ELECTRIC'];
  transmissions = ['All', 'MANUAL', 'AUTOMATIC'];
  years = ['Всички', '2025', '2024', '2023', '2022', '2021'];

  filters = {
    brand: 'Всички',
    model: '',
    maxPrice: '',
    year: 'Всички',
    fuel: 'Всички',
    transmission: 'Всички',
    new: true,
    used: true,
    damaged: false,
  };

  constructor(private definedCarsService: DefinedCarsService) {}

  ngOnInit(): void {
    this.definedCarsService.getBrands().subscribe(brands => {
      this.brands = ['Всички', ...brands];
    });
  }

  onSearch() {
    this.search.emit(this.filters);
  }

  onFiltersChanged(filters: any) {
    this.filteredCars = this.cars.filter(car => {
    const brandOk =
      filters.brand === 'Всички' || car.brand === filters.brand;

    const modelOk =
      !filters.model || (car.model ?? '').toLowerCase().includes(filters.model.toLowerCase());

    const yearOk =
      filters.year === 'Всички' || String(car.year) === String(filters.year);

    const priceOk =
      !filters.maxPrice || (car.price ?? 0) <= Number(filters.maxPrice);

    const fuelOk =
      filters.fuel === 'Всички' || car.fuel === filters.fuel;

    const transOk =
      filters.transmission === 'Всички' || car.transmission === filters.transmission;

    const stateOk =
      (filters.new && car.state === 'NEW') ||
      (filters.used && car.state === 'USED') ||
      (filters.damaged && car.state === 'DAMAGED');

    return brandOk && modelOk && yearOk && priceOk && fuelOk && transOk && stateOk;
  });
}
}
