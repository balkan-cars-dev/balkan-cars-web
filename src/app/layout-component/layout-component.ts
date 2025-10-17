import { Component } from '@angular/core';
import { NavbarComponent } from '../core/navbar-component/navbar-component';
import { BodyComponent } from '../core/body-component/body-component';
import { FooterComponent } from '../core/footer-component/footer-component';

@Component({
  selector: 'app-layout-component',
  imports: [NavbarComponent, BodyComponent, FooterComponent],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.scss',
})
export class LayoutComponent {}
