import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserApiService } from '../user-api.service';
import { User } from '../user';

@Component({
  selector: 'app-crear-funcionarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-funcionarios.component.html',
  styleUrls: ['./crear-funcionarios.component.css'],
})
export class CrearFuncionariosComponent implements OnInit {
  registerForm: FormGroup;
  users: User[] = [];
  selectedUser: User | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private userApiService: UserApiService) {
    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userApiService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'Error fetching users. Please try again later.';
      }
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.selectedUser) {
        const updatedUser = {
          ...this.selectedUser,
          ...this.registerForm.value,
        };
        this.userApiService.updateUser(updatedUser).subscribe(
          () => {
            this.resetForm();
            this.loadUsers();
            this.successMessage = 'User updated successfully.';
          },
          (error) => {
            console.error('Error updating user:', error);
            this.errorMessage = 'Error updating user. Please try again later.';
          }
        );
      } else {
        const newUser: User = this.registerForm.value;
        this.userApiService.addUser(newUser).subscribe(
          () => {
            this.resetForm();
            this.loadUsers();
            this.successMessage = 'User added successfully.';
          },
          (error) => {
            console.error('Error adding user:', error);
            this.errorMessage = 'Error adding user. Please try again later.';
          }
        );
      }
    }
  }

  editUser(user: User) {
    this.selectedUser = user;
    this.registerForm.setValue({
      username: user.username,
      password: user.password,
    });
  }

  deleteUser(user: User) {
    console.log('Deleting user with ID:', user._id); // Mensaje de depuración
    this.userApiService.deleteUser(user._id).subscribe(
      () => {
        // Usar _id para eliminar
        this.users = this.users.filter((u) => u._id !== user._id); // Actualizar la lista en la interfaz de usuario
        this.successMessage = 'User deleted successfully.';
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.errorMessage = 'Error deleting user. Please try again later.';
      }
    );
  }

  resetForm() {
    this.selectedUser = null;
    this.registerForm.reset();
    this.errorMessage = null;
    this.successMessage = null;
  }
}
