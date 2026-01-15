import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CarPartsInterface } from '../../../Interfaces/car-parts-interface';
import { CarPartsService } from '../../../services/car-parts-service';
import {AuthService} from '../../../core/login-component/auth.service';

@Component({
  selector: 'app-add-part-dialog',
  template: `
    <h1 mat-dialog-title>Add New Part</h1>

    <div mat-dialog-content class="dialog-content">
      <form #form="ngForm" (ngSubmit)="onSubmit()">

        <mat-form-field class="full-width">
          <mat-label>Category</mat-label>
          <input matInput [(ngModel)]="carPart.subCategory" name="category" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>State</mat-label>
          <input matInput [(ngModel)]="carPart.state" name="state" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Price</mat-label>
          <input matInput type="number" [(ngModel)]="carPart.price" name="price" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Manufacturer</mat-label>
          <input matInput [(ngModel)]="carPart.manufacturer" name="manufacturer" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Car</mat-label>
          <input matInput [(ngModel)]="carPart.car" name="car" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Quantity</mat-label>
          <input matInput type="number" [(ngModel)]="carPart.quantity" name="quantity" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Description</mat-label>
          <textarea
            matInput
            rows="3"
            [(ngModel)]="carPart.description"
            name="description"
            required>
          </textarea>
        </mat-form-field>

        <div class="image-upload">
          <label for="imageInput">Upload Image</label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            (change)="onFileSelected($event)"
          />

          <div *ngIf="imagePreview" class="preview">
            <p>Preview:</p>
            <img [src]="imagePreview" alt="Image preview">
          </div>
        </div>

        <div class="dialog-actions">
          <button mat-button type="button" mat-dialog-close>
            Cancel
          </button>
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="!form.valid">
            Save
          </button>
        </div>

      </form>
    </div>
  `,
  styleUrls: ['app-part-dialog.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
  ]
})
export class AddPartDialogComponent {

  carPart: CarPartsInterface = {
    id: '',
    subCategory: '',
    state: '',
    price: 0,
    manufacturer: '',
    description: '',
    car: '',
    quantity: 0,
    imageUri: '',
    userId: '',
  };

  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private carPartsService: CarPartsService,
    private dialogRef: MatDialogRef<AddPartDialogComponent>,
    private authService: AuthService // Inject an authentication service
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
        this.carPart.imageUri = reader.result as string;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  onSubmit() {
    if (this.carPart.car === '' || this.carPart.quantity <= 0) {
      console.error('Invalid car or quantity');
      return;
    }

    // Get userId from authentication service
    const userId = this.authService.getUserId();
    this.carPart.userId = userId;

    this.carPartsService.addPart(this.carPart).subscribe({
      next: (response: any) => {
        console.log('Successfully saved part:', response);
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        console.error('Error:', err);
        alert('Failed to save the part. Please try again.');
      },
    });
  }
}
