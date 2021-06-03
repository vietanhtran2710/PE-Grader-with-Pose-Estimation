import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(private authService: AuthService,
              private teacherService: TeacherService,
              private route: ActivatedRoute) { }

  teacherUsername

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.teacherUsername = params.get('username');
      this.teacherService.getByUsername(this.teacherUsername)
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          }
        )
    });
  }

  logOut() {
    this.authService.logout();
  }

}
