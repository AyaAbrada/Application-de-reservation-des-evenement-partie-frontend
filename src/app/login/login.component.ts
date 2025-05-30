import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IntegrationService } from '../services/integration.service';
import { LoginRequest } from '../models/login-request';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class LoginComponent {
  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  private router = inject(Router);

  constructor(private integration: IntegrationService) {}

  login(): void {
    if (this.userForm.invalid) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const request: LoginRequest = {
      username: this.userForm.value.username!,
      password: this.userForm.value.password!
    };

    this.integration.doLogin(request).subscribe({
      next: (res) => {
        console.log('Token reçu :', res.token);
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        alert('Nom d\'utilisateur ou mot de passe incorrect');
        console.error(err);
      }
    });
  }
}
