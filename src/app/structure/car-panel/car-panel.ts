import { Component, Input, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { CarListing } from '../../Interfaces/car-interface';
import { CarsService } from '../../services/cars-service';
import { ListingService } from '../../services/listing-service';
import { AuthService } from '../../core/login-component/auth.service';
import { CarCardComponent } from '../../shared/car-card-component/car-card-component';
import { FiltersComponent } from "../../shared/filters-component/filters-component";

@Component({
  selector: 'app-car-panel',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CarCardComponent, FiltersComponent],
  templateUrl: './car-panel.html',
  styleUrl: './car-panel.scss',
})
export class CarPanel implements OnInit {
  @Input() mode: 'all' | 'my-listings' = 'all';

  private carsService = inject(CarsService);
  private listingService = inject(ListingService);
  private authService = inject(AuthService);

  private carsSubject = new BehaviorSubject<CarListing[]>([]);
  cars$ = this.carsSubject.asObservable();

  private filtersSubject = new BehaviorSubject<any>({
    brand: 'Всички',
    model: '',
    maxPrice: '',
    year: 'Всички',
    fuel: 'Всички',
    transmission: 'Всички',
    new: true,
    used: true,
    damaged: false,
  });

  filteredCars$ = combineLatest([this.cars$, this.filtersSubject]).pipe(
    map(([cars, filters]) =>
      cars.filter(car => {
        const brandOk = filters.brand === 'Всички' || car.brand === filters.brand;
        const modelOk =
          !filters.model ||
          (car.model ?? '').toLowerCase().includes(filters.model.toLowerCase());
        const yearOk = filters.year === 'Всички' || String(car.year) === String(filters.year);
        const priceOk = !filters.maxPrice || (car.price ?? 0) <= Number(filters.maxPrice);

        return brandOk && modelOk && yearOk && priceOk;
      })
    )
  );

  ngOnInit() {
    const source$ =
      this.mode === 'my-listings'
        ? this.listingService.getUserCars(this.authService.getUserId())
        : this.carsService.getAllCars();

    source$.subscribe(cars => this.carsSubject.next(cars));
  }

  onCarSearch(filters: any) {
    this.filtersSubject.next(filters);
  }
}