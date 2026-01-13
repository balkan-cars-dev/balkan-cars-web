import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';          // For input fields
import { MatButtonModule } from '@angular/material/button';        // For buttons
import { MatFormFieldModule } from '@angular/material/form-field'; // For form fields
import { CarPartsInterface } from '../../../Interfaces/car-parts-interface';

@Component({
  selector: 'app-add-part-dialog',
  template: `
  <h1 mat-dialog-title>Add New Part</h1>
  <div mat-dialog-content class="dialog-content">
    <form #form="ngForm" (ngSubmit)="onSubmit()">
      <mat-form-field class="full-width">
        <mat-label>Category</mat-label>
        <input matInput [(ngModel)]="carPart.category" name="category" required>
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
        <mat-label>Description</mat-label>
        <textarea matInput [(ngModel)]="carPart.description" name="description" required></textarea>
      </mat-form-field>

      <div class="image-upload">
        <label for="imageInput">Upload Image:</label>
        <input type="file" id="imageInput" (change)="onFileSelected($event)">
        <div *ngIf="imagePreview" class="preview">
          <p>Preview:</p>
          <img [src]="imagePreview" alt="Image preview" />
        </div>
      </div>

      <div class="dialog-actions">
        <button mat-button mat-dialog-close>Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!form.form.valid">Save</button>
      </div>
    </form>
  </div>
  `,
  styleUrls: ['add-part-dialog.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule
  ]
})
export class AddPartDialogComponent {
  carPart: CarPartsInterface = {
    id: '',
    category: '',
    state: '',
    price: 0,
    manufacturer: '',
    description: '',
    imageUri: ''
  };
  imagePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.carPart.imageUri = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('Submitting new part:', this.carPart);
  
  }
}