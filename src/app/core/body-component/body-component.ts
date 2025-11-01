import {Component, Input} from '@angular/core';
import { CarPartsPanel } from '../../structure/car-parts-panel/car-parts-panel';
import { CarPanel } from '../../structure/car-panel/car-panel';
import { BlogPanel } from '../../structure/blog-panel/blog-panel';

@Component({
  selector: 'app-body-component',
  imports: [CarPanel, CarPartsPanel, BlogPanel],
  templateUrl: './body-component.html',
  styleUrl: './body-component.scss',
})
export class BodyComponent {
  @Input() selected: 'vehicles' | 'carparts' | 'blog' = 'vehicles';
}
