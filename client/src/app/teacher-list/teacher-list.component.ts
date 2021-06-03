import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherService } from 'src/app/services/teacher.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  teachers

  constructor(private authService: AuthService,
              private teacherService: TeacherService) { 

              }

  ngOnInit(): void {
    this.teacherService.getAllTeachers()
      .subscribe(
        data => {
          this.teachers = data;
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

  formatDate(date) {
    let day = date.split('T')[0];
    let items = day.split('-');
    return `${items[2]}-${items[1]}-${items[0]}`
  }

  deleteTeacher(teacher) {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa tài khoản này?',
      showCancelButton: true,
      confirmButtonText: `Xóa`,
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.teacherService.deleteOneTeacher(teacher.id)
          .subscribe(
            data => {
              Swal.fire({
                icon: 'success',
                title: `Xóa tài khoản thành công`,
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
      } else {
        
      }
    })
  }

  logOut() {
    this.authService.logout();
  }

}
