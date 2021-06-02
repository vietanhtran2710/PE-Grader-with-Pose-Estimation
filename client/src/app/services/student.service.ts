import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  createStudent(data) {
    return this.http.post(baseUrl, data);
  }

  getAllStudents() {
    return this.http.get(baseUrl);
  }

  getOneStudent(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getStudentsInClass(classId) {
    return this.http.get(`${baseUrl}/class/${classId}`);
  }

  deleteOneStudent(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteStudentInClass(classId) {
    return this.http.delete(`${baseUrl}/class/${classId}`);
  }

  deleteAllStudents() {
    return this.http.delete(`${baseUrl}`);
  }

  updateStudent(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

}
