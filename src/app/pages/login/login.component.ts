import { Component } from '@angular/core';
import { LoginCredentials } from '../../Entities/login/LoginCredentials';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: LoginCredentials = { username: '', password: '' };
  errorMessage: string | null = null;

  constructor(private router: Router) { }  // Inject Router for navigation

  ngOnInit(): void { }

  onSubmit() {
    // Implement login logic here (placeholder)
    console.log('Submitted:', this.credentials);

    // Example logic (replace with your backend interaction)
    this.errorMessage = 'Simulating login error'; // Placeholder error
    // this.router.navigate(['/home']); // Placeholder successful login navigation
  }
}
