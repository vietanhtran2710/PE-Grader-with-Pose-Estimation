import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { AccountService } from '../services/account.service'
import { map } from 'rxjs/operators';
import { Account } from '../_model/account'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentAccountSubject: BehaviorSubject<Account>;
  private apiUrl = 'http://localhost:8080/api/account'

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.currentAccountSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('currentAccount')));
  }

  public get currentUserValue(): Account {
    return this.currentAccountSubject.value;
  }

  signIn(form: FormData) {
    return this.http.post<any>(this.apiUrl + '/login', form, { responseType: 'json' }).pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentAccount', JSON.stringify(user));
            this.currentAccountSubject.next(user);
            console.log('Logged in')
        }

        return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    this.accountService.updateAccount((this.currentUserValue as any).username, { online: false }).subscribe()
    localStorage.removeItem('currentAccount');
    this.currentAccountSubject.next(null);
    location.reload()
}
}
