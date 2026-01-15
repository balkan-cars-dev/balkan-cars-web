import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for *ngIf
import { CarPartsPanel } from '../../structure/car-parts-panel/car-parts-panel';
import { CarPanel } from '../../structure/car-panel/car-panel';
import { BlogPanel } from '../../structure/blog-panel/blog-panel';
import { AddListingComponent } from '../../shared/add-listing/add-listing-component';
import { LoginComponent } from "../login-component/login.component";

@Component({
  selector: 'app-body-component',
  standalone: true,
  imports: [
    CommonModule,    
    CarPanel,
    CarPartsPanel,
    BlogPanel,
    AddListingComponent, 
    LoginComponent 
  ],
  templateUrl: './body-component.html',
  styleUrls: ['./body-component.scss'],
})
export class BodyComponent {
  @Input() selected: 'vehicles' | 'add' | 'carparts' | 'blog' | 'login' | 'my-listings' = 'vehicles';
  @Output() navigateToVehicles = new EventEmitter<void>();

  onLoginSuccess() {
    this.navigateToVehicles.emit();
  }
}