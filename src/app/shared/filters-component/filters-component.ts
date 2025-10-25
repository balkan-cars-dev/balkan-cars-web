import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters-component.html',
  styleUrl: './filters-component.scss',
})
export class FiltersComponent {
  @Output() search = new EventEmitter<any>();

  brands = ['Всички', 'BMW', 'Audi', 'Mercedes-Benz', 'Volkswagen', 'Toyota'];
  fuels = ['Всички', 'Бензин', 'Дизел', 'Хибрид', 'Електрически'];
  transmissions = ['Всички', 'Ръчна', 'Автоматична'];
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

  onSearch() {
    this.search.emit(this.filters);
  }
}
