import {Component, inject, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {CarPartsCardComponent} from '../../shared/car-parts-card-component/car-parts-card-component';
import {CarPartsService} from '../../services/car-parts-service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddPartDialogComponent } from './add-dialog/app-add-part-dialog';
import { AuthService } from '../../core/login-component/auth.service';
import { Observable } from 'rxjs';
import { CarPartsInterface } from '../../Interfaces/car-parts-interface';

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
  private authService = inject(AuthService);
  
  parts$: Observable<CarPartsInterface[]> = this.partService.getAllPart();
  showFavourites = false;
  favoritePartIds: Set<string> = new Set();

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.partService.getUserFavorites(userId).subscribe(favorites => {
        this.favoritePartIds = new Set(favorites.map(p => p.id));
      });
    }
  }

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

  toggleFavourites() {
    this.showFavourites = !this.showFavourites;
    const userId = this.authService.getUserId();
    
    if (this.showFavourites && userId) {
      this.parts$ = this.partService.getUserFavorites(userId);
    } else {
      this.parts$ = this.partService.getAllPart();
    }
  }

  onFavoriteClick(partId: string) {
    const userId = this.authService.getUserId();
    if (!userId) {
      alert('Моля, влезте в профила си за да добавите към любими');
      return;
    }

    const isFavorite = this.favoritePartIds.has(partId);
    
    if (isFavorite) {
      this.partService.removeFromFavorites(userId, partId).subscribe(() => {
        this.favoritePartIds.delete(partId);
        if (this.showFavourites) {
          this.parts$ = this.partService.getUserFavorites(userId);
        }
      });
    } else {
      this.partService.addToFavorites(userId, partId).subscribe(() => {
        this.favoritePartIds.add(partId);
      });
    }
  }

  isFavorite(partId: string): boolean {
    return this.favoritePartIds.has(partId);
  }
}
