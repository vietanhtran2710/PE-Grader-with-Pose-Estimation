import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { ClassService } from 'src/app/services/class.service';
import { PostService} from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(private authService: AuthService,
              private teacherService: TeacherService,
              private route: ActivatedRoute,
              private router: Router,
              private classService: ClassService,
              private postService: PostService) { }

  teacherUsername
  teacherInfo: any
  posts: any
  classes: any
  postsLoaded = false
  classesLoaded = false

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.teacherUsername = params.get('username');
      this.teacherService.getByUsername(this.teacherUsername)
        .subscribe(
          data => {
            this.teacherInfo = data;
            this.classService.getClassesByTeacher((data as any).id)
              .subscribe(
                data => {
                  this.classes = data;
                  this.classesLoaded = true;
                },
                error => {
                  console.log(error);
                }
              );
            this.postService.getAllPostsByTeacher((data as any).id)
              .subscribe(
                data => {
                  this.posts = data;
                  this.postsLoaded = true;
                },
                error => {
                  console.log(error);
                }
              )
          },
          error => {
            console.log(error);
          }
        )
    });
  }

  formatDate(date) {
    let day = date.split('T')[0];
    let items = day.split('-');
    return `${items[2]}-${items[1]}-${items[0]}`
  }

  goToClass(classId) {
    console.log(classId);
    this.router.navigate([`/class/${classId}`])
  }

  logOut() {
    this.authService.logout();
  }

}
