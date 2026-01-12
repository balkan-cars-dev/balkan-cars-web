import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../login-component/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-component.html',
  styleUrls: ['./navbar-component.scss'] 
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() sectionChange = new EventEmitter<'vehicles' | 'carparts' | 'blog' | 'add' | 'login' | 'my-listings'>();
  
  selected: string = 'vehicles';
  isLoggedIn: boolean = false;
  username: string = '';
  showDropdown: boolean = false;
  
  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isLoggedIn = isAuth;
      if (isAuth) {
        this.username = this.extractUsername();
      } else {
        this.username = '';
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  private extractUsername(): string {
    const token = this.authService.getToken();
    if (!token) return 'Потребител'; // Fallback to "User" in Bulgarian

    try {
      // Decode JWT payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Try common JWT claims: 'unique_name', 'sub', 'preferred_username', or 'email'
      const name = payload.unique_name || payload.username || payload.sub || payload.email;
      
      if (name && name.includes('@')) {
        return name.split('@')[0]; // Return everything before the @
      }
      return name || 'Потребител';
    } catch (e) {
      return 'Потребител';
    }
  }

  select(section: 'vehicles' | 'carparts' | 'blog' | 'add' | 'login' | 'my-listings') {
  this.selected = section;
  this.sectionChange.emit(section);
  this.showDropdown = false;
}

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.authService.logout();
    this.showDropdown = false;
    this.select('vehicles');
  }
}