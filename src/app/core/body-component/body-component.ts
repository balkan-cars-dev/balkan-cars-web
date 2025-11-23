import {Component, Input} from '@angular/core';
import { CarPartsPanel } from '../../structure/car-parts-panel/car-parts-panel';
import { CarPanel } from '../../structure/car-panel/car-panel';
import { BlogPanel } from '../../structure/blog-panel/blog-panel';
import { LoginComponent } from "../login-component/login.component";

@Component({
  selector: 'app-body-component',
  imports: [CarPanel, CarPartsPanel, BlogPanel, LoginComponent],
  templateUrl: './body-component.html',
  styleUrls: ['./body-component.scss'],
})
export class BodyComponent {
  @Input() selected: 'vehicles' | 'carparts' | 'blog' | 'login' = 'vehicles';
}
