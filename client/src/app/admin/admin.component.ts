import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { StudentService } from 'src/app/services/student.service';
import { ClassService } from 'src/app/services/class.service';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { StudentRecord } from 'src/app/_model/studentModel';
import { TeacherRecord } from 'src/app/_model/teacherModel';  
import { StudentListRecord } from 'src/app/_model/studentListModel';
import { Router } from '@angular/router'

import Swal from 'sweetalert2';
import { computeOptimalWindowSize } from '@tensorflow/tfjs-core/dist/ops/reduce_util';


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
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
  }

  classData = {
    id: '',
    subject: '',
    weekDay: '',
    startTime: '',
    teacherName: '',
    teacherId: ''
  }

  public studentRecords: any[] = [];
  public teacherRecords: any[] = [];
  public studentListRecords: any[] = [];
  public teachers: any;
  @ViewChild('studentReader') studentReader: any; 
  @ViewChild('teacherReader') teacherReader: any; 
  @ViewChild('studentListReader') studentListReader: any; 

  constructor(private studentService: StudentService,
              private teacherService: TeacherService,
              private classService: ClassService,
              private accountService: AccountService,
              private authService: AuthService,
              private router: Router,) { }

  ngOnInit(): void {
    this.teacherService.getAllTeachers()
      .subscribe(
        data => {
          console.log(data);
          this.teachers = data;
          this.classData.teacherName = data[0].name;
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

  studentUploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.studentRecords = this.getStudentRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
      };  
  
      reader.onerror = function () {  
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Đã xảy ra lỗi',
          text: 'Lỗi khi đọc file CSV',
          showConfirmButton: false,
          timer: 5500
        })  
      };  
  
    } else {  
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Sai định dạng tệp',
        text: 'Vui lòng chọn tệp đuôi .csv',
        showConfirmButton: false,
        timer: 5500
      })
      this.studentFileReset();  
    }  
  }

  teacherUploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.teacherRecords = this.getTeacherRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
      };  
  
      reader.onerror = function () {  
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Đã xảy ra lỗi',
          text: 'Lỗi khi đọc file CSV',
          showConfirmButton: false,
          timer: 5500
        })  
      };  
  
    } else {  
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Sai định dạng tệp',
        text: 'Vui lòng chọn tệp đuôi .csv',
        showConfirmButton: false,
        timer: 5500
      })  
      this.teacherFileReset();  
    }  
  }

  studentListUploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.studentListRecords = this.getStudentListRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        console.log("asdfasdf", this.studentListRecords.length);  
      };  
  
      reader.onerror = function () {  
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Đã xảy ra lỗi',
          text: 'Lỗi khi đọc file CSV',
          showConfirmButton: false,
          timer: 5500
        }) 
      };  
  
    } else {  
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Sai định dạng tệp',
        text: 'Vui lòng chọn tệp đuôi .csv',
        showConfirmButton: false,
        timer: 5500
      })  
      this.studentListFileReset();  
    }  
  }

  getStudentRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: StudentRecord = new StudentRecord();  
        csvRecord.id = curruntRecord[0].trim();  
        csvRecord.fullName = curruntRecord[1].trim();  
        csvRecord.university = curruntRecord[2].trim();  
        csvRecord.phoneNumber = curruntRecord[3].trim();  
        csvRecord.dateOfBirth = curruntRecord[4].trim();  
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  

  getTeacherRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: TeacherRecord = new TeacherRecord();  
        csvRecord.username = curruntRecord[0].trim();  
        csvRecord.fullName = curruntRecord[1].trim();  
        csvRecord.email = curruntRecord[2].trim();  
        csvRecord.phoneNumber = curruntRecord[3].trim();  
        csvRecord.dateOfBirth = curruntRecord[4].trim();  
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  

  getStudentListRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: StudentListRecord = new StudentListRecord();  
        csvRecord.id = curruntRecord[0].trim();  
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  studentFileReset() {  
    this.studentReader.nativeElement.value = "";  
    this.studentRecords = [];  
  }

  teacherFileReset() {  
    this.teacherReader.nativeElement.value = "";  
    this.teacherRecords = [];  
  }

  studentListFileReset() {  
    this.studentListReader.nativeElement.value = "";  
    this.studentListRecords = [];  
  }

  createManyStudent() {
    let studentNumber = this.studentRecords.length;
    let created = 0;
    console.log(this.studentRecords);
    for (let student of this.studentRecords) {
      let _student = {
        username: student.id,
        email: student.id + "@vnu.edu.vn",
        id: student.id,
        fullName: student.fullName,
        university: student.university,
        phoneNumber: student.phoneNumber,
        dateOfBirth: student.dateOfBirth
      }
      let account = {
        username: _student.id,
        password: _student.id,
        accountType: "student"
      }
      this.accountService.createAccount(account)
      .subscribe(
        data => {
          this.studentService.createStudent(_student)
            .subscribe(
              data => {
                created++;
                if (created == studentNumber) {
                  Swal.fire({
                    icon: 'success',
                    title: `Tạo ${created} tài khoản sinh viên thành công`,
                    showConfirmButton: true,
                  })
                }
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
                Swal.fire({
                  icon: 'success',
                  title: 'Tạo tài khoản sinh viên thành công',
                  showConfirmButton: true,
                })
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

  createManyTeacher() {
    let teacherNumber = this.teacherRecords.length;
    let created = 0;
    console.log(this.teacherRecords);
    for (let teacher of this.teacherRecords) {
      let accountData = {
        username: teacher.username,
        password: teacher.username,
        accountType: "teacher"
      }
      let _teacher = {
        username: teacher.username,
        fullName: teacher.fullName,
        email: teacher.email,
        phoneNumber: teacher.phoneNumber,
        dateOfBirth: teacher.dateOfBirth,
      }
      this.accountService.createAccount(accountData)
      .subscribe(
        data => {
          this.teacherService.createTeacher(_teacher)
            .subscribe(
              data => {
                created++;
                if (created == teacherNumber) {
                  Swal.fire({
                    icon: 'success',
                    title: `Tạo ${created} tài khoản giáo viên thành công`,
                    showConfirmButton: true,
                  })
                }
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

  createTeacher() {
    console.log(this.teacherData);
    let accountData = {
      username: this.teacherData.username,
      password: this.teacherData.username,
      accountType: "teacher"
    }
    this.accountService.createAccount(accountData)
      .subscribe(
        data => {
          this.teacherService.createTeacher(this.teacherData)
            .subscribe(
              data => {
                Swal.fire({
                  icon: 'success',
                  title: 'Tạo tài khoản giáo viên thành công',
                  showConfirmButton: true,
                })
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

  createClass() {
    let studentNumber = this.studentListRecords.length;
    let created = 0;
    console.log(this.studentListRecords);
    for (let teacher of this.teachers) {
      if (teacher.fullName == this.classData.teacherName) {
        this.classData.teacherId = teacher.id;
      }
    }
    console.log(this.classData);
    this.classService.createClass(this.classData)
      .subscribe(
        data => {
          for (let studentId of this.studentListRecords) {
            this.studentService.updateStudent(studentId.id, { classId: this.classData.id})
              .subscribe(
                data => {
                  created++;
                  if (created == studentNumber) {
                    Swal.fire({
                      icon: 'success',
                      title: `Tạo lớp thành công với ${created} sinh viên`,
                      showConfirmButton: true,
                    })
                  }
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

  openTeachersList() {
    this.router.navigate(['admin/teacherslist'])
  }

  openStudentsList() {
    this.router.navigate(['admin/studentslist'])
  }

  openClassesList() {
    this.router.navigate(['admin/classeslist'])
  }

  logOut() {
    this.authService.logout();
  }

}
