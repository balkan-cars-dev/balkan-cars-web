import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CarPartsInterface} from '../../Interfaces/car-parts-interface';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-car-parts-card-component',
  imports: [CommonModule],
  templateUrl: './car-parts-card-component.html',
  styleUrl: './car-parts-card-component.scss'
})
export class CarPartsCardComponent {
  @Input() part!: CarPartsInterface;
  @Input() isFavorite: boolean = false;
  @Output() favoriteClick = new EventEmitter<string>();

  onFavoriteClick(event: Event) {
    event.stopPropagation();
    this.favoriteClick.emit(this.part.id);
  }
}
