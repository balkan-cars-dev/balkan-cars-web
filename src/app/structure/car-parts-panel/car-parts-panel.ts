import {Component, inject, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {CarPartsCardComponent} from '../../shared/car-parts-card-component/car-parts-card-component';
import {CarPartsService} from '../../services/car-parts-service';

@Component({
  selector: 'app-car-parts-panel',
  imports: [
    AsyncPipe,
    CarPartsCardComponent
  ],
  templateUrl: './car-parts-panel.html',
  styleUrl: './car-parts-panel.scss'
})
export class CarPartsPanel {
  private partService = inject(CarPartsService);
  parts$ = this.partService.getAllPart();

  protected readonly Date = Date;
}
