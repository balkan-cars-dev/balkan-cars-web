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
import { DefinedCarsService } from '../../services/defined-cars-service';

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

  brands: string[] = [];

  // Variable to store the encoded image string
  imageBase64: string | null = null;

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private carsService: CarsService,
    private authService: AuthService,
    private definedCarsService: DefinedCarsService
  ) {}

  ngOnInit(): void {
    this.definedCarsService.getBrands().subscribe(brands => {
      this.brands = brands;
    });

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

  // UPDATED: Convert file to Base64 String
  uploadImages(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // This result looks like: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
        this.imageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const f = this.form.value;

    // Step 1: Create the Car DTO with the encoded image string
    const carDto = {
      id: null,
      vin: f.vin,
      brand: f.make,
      model: f.model,
      year: f.year,
      fuelType: f.fuelType,
      transmission: f.transmission,
      mileage: f.mileage,
      enginePower: f.enginePower,
      color: f.color,
      image: this.imageBase64 // Send the string directly
    };

    // Step 2: Send as standard JSON
    this.carsService.createCar(carDto).subscribe({
      next: (createdCar) => {
        const carId = createdCar.id;

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

        this.listingService.create(listingDto).subscribe({
          next: () => {
            alert('Обявата е създадена успешно!');
            this.form.reset();
            this.imageBase64 = null;
          },
          error: (e) => console.error('Listing creation error', e),
        });
      },
      error: (err) => console.error('Car creation error', err),
    });
  }
}
