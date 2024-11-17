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
    this.userApiService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.selectedUser) {
        const updatedUser = {
          ...this.selectedUser,
          ...this.registerForm.value,
        };
        this.userApiService.updateUser(updatedUser).subscribe(() => {
          this.resetForm();
          this.loadUsers();
        });
      } else {
        const newUser: User = this.registerForm.value;
        this.userApiService.addUser(newUser).subscribe(() => {
          this.resetForm();
          this.loadUsers();
        });
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
    this.userApiService.deleteUser(user).subscribe(() => {
      this.loadUsers();
    });
  }

  resetForm() {
    this.selectedUser = null;
    this.registerForm.reset();
  }
}
