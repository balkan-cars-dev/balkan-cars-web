import {Component, inject, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {CarPartsCardComponent} from '../../shared/car-parts-card-component/car-parts-card-component';
import {CarPartsService} from '../../services/car-parts-service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddPartDialogComponent } from './add-dialog/app-add-part-dialog';

@Component({
  selector: 'app-car-parts-panel',
  imports: [
    AsyncPipe,
    CarPartsCardComponent,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './car-parts-panel.html',
  styleUrl: './car-parts-panel.scss'
})
export class CarPartsPanel {
   private partService: CarPartsService = inject(CarPartsService);
  private dialog = inject(MatDialog);
  parts$ = this.partService.getAllPart();

  openAddDialog() {
    const dialogRef = this.dialog.open(AddPartDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.parts$ = this.partService.getAllPart();
      }
    });
  }

}
