import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service'
import { AuthService } from 'src/app/services/auth.service'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
      if (this.authService.currentUserValue) {
        this.router.navigate(['/'])
      }
  }

  returnUrl: string
  account: FormGroup

  ngOnInit(): void {
    this.account = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signIn() {
    var form = document.querySelector('form')

    var formData = new FormData(form)

    this.authService.signIn(formData).pipe(catchError(err => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Không thể đăng nhập',
        text: 'Tên người dùng hoặc mật khẩu không chính xác!',
        footer: '<a href>Quên mật khẩu?</a>',
        width: "400px",
      })
      return throwError(err);
    })).subscribe(data => {
      if (data.token) {
        // this.accountService.updateAccount(data.username, { online: true }).subscribe(data => this.router.navigate([this.returnUrl]))
        this.accountService.updateAccount(data.username, { online: true }).subscribe(
          data => {
            console.log(this.returnUrl)
            this.router.navigate([this.returnUrl])
          },
          error => {
            console.log(error);
          })
      }
    })
  }

}