import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Users } from '../pages/models/users.model'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private api = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  create(user: Users): Observable<any> {
    return this.http.post(this.api, user)
  }
}

