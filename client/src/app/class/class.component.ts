import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service'; 
import { TeacherService } from 'src/app/services/teacher.service';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private classService: ClassService,
              private studentService: StudentService,
              private teacherService: TeacherService,
              private postService: PostService) { }

  classId
  classInfo: any
  teacherInfo: any
  students: any
  posts: any
  teacherLoaded = false
  classLoaded = false
  studentsLoaded = false
  postsLoaded = false
  currentUser: any
  roleTeacher = "teacher"
  postData = {
    postName: '',
    content: '',
    teacherId: '',
    classId: ''
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.classId = params.get('id');
      console.log(this.classId);
      this.classService.getOneClass(this.classId)
        .subscribe(
          data => {
            this.classInfo = data;
            this.classLoaded = true;

            this.teacherService.getOneTeacher(this.classInfo.teacherId)
              .subscribe(
                data => {
                  this.teacherInfo = data;
                  this.teacherLoaded = true;
                },
                error => {
                  console.log(error)
                }
              )
            this.studentService.getStudentsInClass(this.classInfo.id)
              .subscribe(
                  data => {
                    this.students = data;
                    this.studentsLoaded = true; 
                  },
                  error => {
                    console.log(error);
                  }
              );
            this.postService.getAllPostsInClass(this.classInfo.id)
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
    })
    this.currentUser = this.authService.currentUserValue
  }

  formatDate(date) {
    let day = date.split('T')[0];
    let items = day.split('-');
    return `${items[2]}-${items[1]}-${items[0]}`
  }

  logOut() {
    this.authService.logout();
  }

  createPost() {
    this.postData.classId = this.classInfo.id;
    this.postData.teacherId = this.teacherInfo.id;
    console.log(this.postData);
    this.postService.createPost(this.postData)
      .subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: `Tạo bài đăng thành công`,
            showConfirmButton: true,
          }).then((result) => {
              location.reload();
            });
        },
        error => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Đã xảy ra lỗi',
            text: 'Chúng tôi sẽ khắc phục sớm nhất có thể',
            showConfirmButton: false,
            timer: 5500
          })
        }
      )
  }
 
}
