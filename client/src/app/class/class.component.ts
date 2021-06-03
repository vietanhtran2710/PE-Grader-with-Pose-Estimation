import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService: AuthService) { }

  classId

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.classId = params.get('id');
      console.log(this.classId);
    })
  }

  logOut() {
    this.authService.logout();
    console.log("clicked");
  }
 
}
