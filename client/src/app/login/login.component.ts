import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { throwError } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  account: FormGroup

  ngOnInit(): void {
    this.account = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  signIn() {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Không thể đăng nhập',
      text: 'Tên người dùng hoặc mật khẩu không chính xác!',
      footer: '<a href>Quên mật khẩu?</a>',
      width: "400px",
    })
  }

}