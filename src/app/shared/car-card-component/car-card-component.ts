import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CarListing } from '../../Interfaces/car-interface';
import { WishlistService } from '../../services/wishlist-service';

@Component({
  selector: 'app-car-card-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './car-card-component.html',
  styleUrl: './car-card-component.scss',
})
export class CarCardComponent implements OnInit {
  @Input() car!: CarListing;

  isWishlisted = false;
  loading = false;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe(items => {
      this.isWishlisted = items.some(i => i.listingId === this.car.id);
    });
  }

  toggleWishlist() {
    if (this.loading) return;
    this.loading = true;

    const request = this.isWishlisted
      ? this.wishlistService.remove(this.car.id)
      : this.wishlistService.add(this.car.id);

    request.subscribe({
      next: () => {
        this.isWishlisted = !this.isWishlisted;
        this.loading = false;
      },
      error: () => {
        console.error('Wishlist error');
        this.loading = false;
      }
    });
  }
}
