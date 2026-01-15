import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ListingService } from '../../services/listing-service';
import { CarsService } from '../../services/cars-service';
import { FuelType, FuelTypeLabels } from '../../core/enums/FuelType';
import { TransmissionType, TransmissionTypeLabels } from '../../core/enums/TransmissionType';
import { State, StateLabels } from '../../core/enums/State';
import { ExtrasByCategory, ExtraLabels } from './extras-grouped';
import { AuthService } from '../../core/login-component/auth.service';

@Component({
  selector: 'app-add-listing-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-listing-component.html',
  styleUrls: ['./add-listing-component.scss'],
})
export class AddListingComponent implements OnInit {

  form!: FormGroup;

  fuelTypes = Object.values(FuelType);
  transmission = Object.values(TransmissionType);
  states = Object.values(State);

  fuelTypeLabels = FuelTypeLabels;
  transmissionLabels = TransmissionTypeLabels;
  stateLabels = StateLabels;

  extras = ExtrasByCategory;
  extraLabels = ExtraLabels;

  images: File[] = [];

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private carsService: CarsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1950)]],
      mileage: ['', Validators.required],
      priceEur: ['', Validators.required],

      vin: ['', Validators.required],
      enginePower: ['', Validators.required],
      color: ['', Validators.required],

      fuelType: ['', Validators.required],
      transmission: ['', Validators.required],
      state: ['', Validators.required],
      region: ['', Validators.required],

      extras: [[]],
      description: ['', Validators.maxLength(500)],
      imageUrls: [[]],
    });
  }

  onExtrasChange(extra: string, event: any) {
    const selected = this.form.value.extras || [];
    if (event.target.checked) {
      selected.push(extra);
    } else {
      const index = selected.indexOf(extra);
      if (index > -1) selected.splice(index, 1);
    }
    this.form.patchValue({ extras: selected });
  }

  isExtraSelected(extra: string): boolean {
    const selected = this.form.value.extras || [];
    return selected.includes(extra);
  }

  uploadImages(event: any) {
    const files = event.target.files;
    this.images = [...files];
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const f = this.form.value;

    // Step 1: Create the Car DTO
    const carDto = {
      id: null, // let backend generate
      vin: f.vin,
      brand: f.make,
      model: f.model,
      year: f.year,
      fuelType: f.fuelType,
      transmission: f.transmission,
      mileage: f.mileage,
      enginePower: f.enginePower,
      color: f.color
    };

    // Step 2: Create the car first
    this.carsService.createCar(carDto).subscribe({
      next: (createdCar) => {
        const carId = createdCar.id;

        // Step 3: Construct listing DTO
        const title = `${f.make} ${f.model} (${f.year})`;

        const groupedExtras: Record<string, string[]> = {};
        this.extras.forEach(cat => {
          const selectedInCategory = cat.items.filter((e: string) =>
            f.extras.includes(e)
          );
          if (selectedInCategory.length > 0) {
            groupedExtras[cat.category] = selectedInCategory;
          }
        });

        const listingDto = {
          id: null,
          title: title,
          description: f.description,
          carId: carId,
          sellerId: this.authService.getUserId(), 
          price: f.priceEur,
          location: f.region,
          isActive: true,
          extras: f.extras,
          groupedExtras: groupedExtras,
        };

        // Step 4: Create the listing
        this.listingService.create(listingDto).subscribe({
          next: () => alert('Обявата е създадена успешно!'),
          error: (e) => console.error('Listing creation error', e),
        });
      },
      error: (err) => console.error('Car creation error', err),
    });
  }
}
