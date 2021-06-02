import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  createAccount(data) {
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
    return this.http.put(`${baseUrl}/${username}`, data);
  }
}
