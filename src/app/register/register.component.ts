import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UserApiService } from '../user-api.service';
import { User } from '../user'; // Importar User

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userApiService: UserApiService) {
    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newUser: User = this.registerForm.value; // Asignar tipo User
      this.userApiService.addUser(newUser).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          this.registerForm.reset();
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    }
  }
}
