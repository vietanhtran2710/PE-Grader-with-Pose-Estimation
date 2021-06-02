import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as bcrypt from 'bcryptjs'

const baseUrl = 'http://localhost:8080/api/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  createAccount(data) {
    const salt: string = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt)
    return this.http.post(baseUrl, data);
  }

  getAllAccounts() {
    return this.http.get(baseUrl);
  }

  getAccountByUsername(username) {
    return this.http.get(`${baseUrl}/username/${username}`);
  }

  deleteAccountByUsername(username) {
    return this.http.delete(`${baseUrl}/${username}`);
  }

  deleteAllAccount() {
    return this.http.delete(baseUrl);
  }

  updateAccount(username, data) {
    const salt: string = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt)
    return this.http.put(`${baseUrl}/${username}`, data);
  }
}
