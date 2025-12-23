import { Component } from '@angular/core';
import { AuthService } from '../login-component/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Toggle between login and register mode
  isRegisterMode: boolean = false;

  // Login fields
  email: string = '';
  password: string = '';
  
  // Registration fields
  registerData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = ''; // Clear error message when switching modes
    this.clearForms(); // Clear all forms when switching modes
  }

  clearForms() {
    // Clear login form
    this.email = '';
    this.password = '';
    
    // Clear registration form
    this.registerData = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      city: ''
    };
  }

  login() {
    this.errorMessage = '';
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: (err) => this.errorMessage = 'Invalid email or password'
    });
  }

  register() {
    this.errorMessage = '';
    this.authService.register(this.registerData).subscribe({
      next: (res) => {
        // If backend returns JWT token, navigate to cars
        if (res?.token) {
          this.clearForms(); // Clear form before navigation
          this.router.navigate(['/cars']);
        } else {
          // Switch to login mode after successful registration
          this.isRegisterMode = false;
          this.email = this.registerData.email;
          this.clearForms(); // Clear registration form
          this.errorMessage = 'Registration successful! Please log in.';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }
}