import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { StudentService } from 'src/app/services/student.service'

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private studentService: StudentService) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue != null) {
      if (this.authService.currentUserValue.accountType == "student") {
        this.studentService.getOneStudent(this.authService.currentUserValue.username)
          .subscribe(
            data => {
              console.log(data);
              this.router.navigate([`class/${(data as any).classId}`]);
            },
            error => {
              console.log(error);
            }
          )
      }
      else
        if (this.authService.currentUserValue.accountType == "admin") {
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate([`teacher/${this.authService.currentUserValue.username}`]);
        }
    }
  }

}
