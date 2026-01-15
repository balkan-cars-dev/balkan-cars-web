import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-detail-modal.component.html',
  styleUrl: './listing-detail-modal.component.scss'
})
export class ListingDetailModalComponent {
  @Input() listing: any;
  @Input() isOpen = false;
  @Input() showDelete = false;
  @Output() close = new EventEmitter<void>();
  @Output() deleteClick = new EventEmitter<string>();

  closeModal() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  onDelete() {
    this.deleteClick.emit(this.listing.id);
  }
}
