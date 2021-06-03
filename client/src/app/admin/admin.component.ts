import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { StudentService } from 'src/app/services/student.service';
import { ClassService } from 'src/app/services/class.service';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { StudentRecord } from 'src/app/_model/studentModel';
import { TeacherRecord } from 'src/app/_model/teacherModel';  
import { StudentListRecord } from 'src/app/_model/studentListModel';  


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
    day: '',
    time: '',
    teacherName: ''
  }

  public studentRecords: any[] = [];
  public teacherRecords: any[] = [];
  public studentListRecords: any[] = [];
  @ViewChild('studentReader') studentReader: any; 
  @ViewChild('teacherReader') teacherReader: any; 
  @ViewChild('studentListReader') studentListReader: any; 

  constructor(private studentService: StudentService,
              private teacherService: TeacherService,
              private classService: ClassService,
              private accountService: AccountService,
              private authService: AuthService) { }

  ngOnInit(): void {
    
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
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
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
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
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
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
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

  createManyTeacher() {
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
                console.log("Created teacher successfully");
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
                console.log("Created teacher successfully");
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

  createClass() {
    console.log(this.classData);
    console.log(this.studentListRecords);
  }

  logOut() {
    this.authService.logout();
  }

}
