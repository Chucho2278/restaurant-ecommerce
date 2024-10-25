import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private apiUrl = 'http://localhost:5000/api/users';

  getUsers(): Observable<User[]> {
    return new Observable((observer) => {
      axios
        .get(this.apiUrl)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  addUser(user: User): Observable<User> {
    return new Observable((observer) => {
      axios
        .post(this.apiUrl, user)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
