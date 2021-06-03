import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students
  constructor(private authService: AuthService,
              private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getAllStudents()
      .subscribe(
        data => {
          this.students = data;
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

  deleteStudent(student) {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa tài khoản này?',
      showCancelButton: true,
      confirmButtonText: `Xóa`,
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteOneStudent(student.id)
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
