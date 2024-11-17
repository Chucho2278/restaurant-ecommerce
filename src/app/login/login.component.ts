import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from '../user-api.service';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userApiService: UserApiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user: User = this.loginForm.value;
      this.userApiService.getUsers().subscribe(
        (users: User[]) => {
          const foundUser = users.find(
            (u) => u.username === user.username && u.password === user.password
          );
          if (foundUser) {
            console.log('Login successful:', foundUser);
            this.authService.login(); // Iniciar sesión
            this.router.navigate(['/funcionarios']);
            this.errorMessage = null;
          } else {
            this.errorMessage = 'Usuario o contraseña inválida';
          }
        },
        (error) => {
          this.errorMessage = 'Error de conexión, por favor intenta nuevamente';
        }
      );
    }
  }
}
