import {Component, Input} from '@angular/core';
import { CarPartsPanel } from '../../structure/car-parts-panel/car-parts-panel';
import { CarPanel } from '../../structure/car-panel/car-panel';
import { BlogPanel } from '../../structure/blog-panel/blog-panel';
import { AddListingComponent } from '../../shared/add-listing/add-listing-component';

@Component({
  selector: 'app-body-component',
  imports: [
    CarPanel,
    CarPartsPanel,
    BlogPanel,
    AddListingComponent   // ADD THIS
  ],
  templateUrl: './body-component.html',
  styleUrls: ['./body-component.scss'],
})
export class BodyComponent {
  @Input() selected:
    'vehicles' | 'carparts' | 'blog' | 'add' = 'vehicles';
}

