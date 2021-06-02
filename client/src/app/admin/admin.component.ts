import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service'
import { StudentService } from 'src/app/services/student.service'
import { ClassService } from 'src/app/services/class.service'
import { AccountService } from 'src/app/services/account.service'

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  studentData = {
    username: '',
    email: '',
    id: '',
    fullName: '',
    university: '',
    phoneNumber: '',
    dateOfBirth: ''
  }

  teacherData = {
    accountUsername: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
  }

  classData = {
    id: '',
    subject: '',
    day: '',
    time: '',
    teacherName: ''
  }

  constructor(private studentService: StudentService,
              private teacherService: TeacherService,
              private classService: ClassService,
              private accountService: AccountService) { }

  ngOnInit(): void {

  }

  createStudent() {
    console.log(this.studentData);
    let accountData = {
      username: this.studentData.id,
      password: this.studentData.id,
      accountType: "student"
    }
    this.accountService.createAccount(accountData)
      .subscribe(
        data => {
          this.studentData.email = this.studentData.id + "@vnu.edu.vn";
          this.studentData.username = this.studentData.id;
          this.studentService.createStudent(this.studentData)
            .subscribe(
              data => {
                console.log("Created student successfully");
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
  }

  createTeacher() {
    console.log(this.teacherData);
  }

  createClass() {
    console.log(this.classData);
  }

}
