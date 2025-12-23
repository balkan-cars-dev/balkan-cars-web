import { Component, Input, OnInit, inject } from '@angular/core';
import { CarCardComponent } from '../../shared/car-card-component/car-card-component';
import { FiltersComponent } from '../../shared/filters-component/filters-component';
import { ListingService } from '../../services/listing-service'; // Use ListingService
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CarListing } from '../../Interfaces/car-interface';
import { AuthService } from '../../core/login-component/auth.service';
import { CarsService } from '../../services/cars-service';

@Component({
  selector: 'app-car-panel',
  standalone: true,
  imports: [CommonModule, CarCardComponent, FiltersComponent, AsyncPipe],
  templateUrl: './car-panel.html',
  styleUrl: './car-panel.scss',
})
export class CarPanel implements OnInit {
  @Input() mode: 'all' | 'my-listings' = 'all';

  private carsService = inject(CarsService);
  private listingService = inject(ListingService);
  private authService = inject(AuthService);
  
  cars$!: Observable<CarListing[]>;

  ngOnInit() {
    if (this.mode === 'my-listings') {
      const userId = this.authService.getUserId();
      this.cars$ = this.listingService.getUserCars(userId);
    } else {
      this.cars$ = this.carsService.getAllCars();
    }
  }

  onCarSearch(filters: any) {
    console.log('Search filters:', filters);
  }
}