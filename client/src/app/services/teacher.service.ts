import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  createTeacher(data) {
    return this.http.post(baseUrl, data);
  }  

  getAllTeachers() {
    return this.http.get(baseUrl);
  }

  getOneTeacher(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getByUsername(username) {
    return this.http.get(`${baseUrl}/username/${username}`);
  }

  deleteOneTeacher(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAllTeacher(id) {
    return this.http.delete(`${baseUrl}`);
  }

  updateTeacher(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
