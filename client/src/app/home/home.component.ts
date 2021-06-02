import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
