import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { TeacherService } from 'src/app/services/teacher.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  classes
  teacherNameMap = new Map();

  constructor(private authService: AuthService,
              private classService: ClassService,
              private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.classService.getAllClasses()
      .subscribe(
        data => {
          this.classes = data;
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
    this.teacherService.getAllTeachers().subscribe(
      data => {
        for (let item of data as any) {
          this.teacherNameMap.set(item.id, item.fullName);
        }
      }
    )
  }

  getTeacherName(teacherId) {
    return this.teacherNameMap.get(teacherId)
  }

  deleteClass(_class) {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa lớp này?',
      showCancelButton: true,
      confirmButtonText: `Xóa`,
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.classService.deleteOneClass(_class.id)
          .subscribe(
            data => {
              Swal.fire({
                icon: 'success',
                title: `Xóa lớp thành công`,
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
