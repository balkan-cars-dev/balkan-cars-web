import { Component, Input, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, forkJoin, map, switchMap } from 'rxjs';
import { CarListing } from '../../Interfaces/car-interface';
import { CarsService } from '../../services/cars-service';
import { ListingService } from '../../services/listing-service';
import { AuthService } from '../../core/login-component/auth.service';
import { CarCardComponent } from '../../shared/car-card-component/car-card-component';
import { FiltersComponent } from "../../shared/filters-component/filters-component";
import { Listing, ListingWithCar } from '../../Interfaces/listing-interface';
import { ListingDetailModalComponent } from '../../shared/listing-detail-modal/listing-detail-modal.component';

@Component({
  selector: 'app-car-panel',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CarCardComponent, FiltersComponent, ListingDetailModalComponent],
  templateUrl: './car-panel.html',
  styleUrl: './car-panel.scss',
})
export class CarPanel implements OnInit {
  @Input() mode: 'all' | 'my-listings' = 'all';

  private carsService = inject(CarsService);
  private listingService = inject(ListingService);
  private authService = inject(AuthService);

  private carsSubject = new BehaviorSubject<any[]>([]);
  cars$ = this.carsSubject.asObservable();

  selectedListing: any = null;
  isModalOpen = false;

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
    if (this.mode === 'my-listings') {
      this.listingService.getUserListings(this.authService.getUserId()).pipe(
        switchMap(listings => {
          if (!listings || listings.length === 0) {
            return [[]];
          }
          // Filter out listings with null/invalid carId
          const validListings = listings.filter(listing => listing.carId != null);
          
          if (validListings.length === 0) {
            return [[]];
          }
          
          const listingsWithCars = validListings.map(listing =>
            this.carsService.getCarById(listing.carId).pipe(
              map(car => ({
                id: listing.id,
                brand: car.brand,
                model: car.model,
                price: listing.price,
                mileage: car.mileage,
                region: listing.location || 'Н/Д',
                year: car.year,
                fuel: car.fuelType,
                transmission: car.transmission,
                imageUrl: 'assets/car-placeholder.jpg',
                date: new Date().toLocaleDateString(),
                listingData: listing,
                carData: car
              }))
            )
          );
          return forkJoin(listingsWithCars);
        })
      ).subscribe({
        next: cars => this.carsSubject.next(cars),
        error: err => console.error('Error loading my listings:', err)
      });
    } else {
      this.listingService.getAll().pipe(
        switchMap(listings => {
          if (!listings || listings.length === 0) {
            return [[]];
          }
          // Filter out listings with null/invalid carId
          const validListings = listings.filter(listing => listing.carId != null);
          
          if (validListings.length === 0) {
            return [[]];
          }
          
          const listingsWithCars = validListings.map(listing =>
            this.carsService.getCarById(listing.carId).pipe(
              map(car => ({
                id: listing.id,
                brand: car.brand,
                model: car.model,
                price: listing.price,
                mileage: car.mileage,
                region: listing.location || 'Н/Д',
                year: car.year,
                fuel: car.fuelType,
                transmission: car.transmission,
                imageUrl: 'assets/car-placeholder.jpg',
                date: new Date().toLocaleDateString(),
                listingData: listing,
                carData: car
              }))
            )
          );
          return forkJoin(listingsWithCars);
        })
      ).subscribe({
        next: cars => this.carsSubject.next(cars),
        error: err => console.error('Error loading all listings:', err)
      });
    }
  }

  onCarSearch(filters: any) {
    this.filtersSubject.next(filters);
  }

  onCardClick(car: any) {
    this.selectedListing = car;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedListing = null;
  }

  deleteListing(listingId: string) {
    if (confirm('Сигурни ли сте, че искате да изтриете този листинг?')) {
      this.listingService.delete(listingId).subscribe({
        next: () => {
          const currentCars = this.carsSubject.value.filter(car => car.id !== listingId);
          this.carsSubject.next(currentCars);
          this.closeModal();
        },
        error: (err) => {
          console.error('Error deleting listing:', err);
          alert('Грешка при изтриване на листинг');
        }
      });
    }
  }
}