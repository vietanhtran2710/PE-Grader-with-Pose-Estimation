import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  createClass(data) {
    return this.http.post(baseUrl, data);
  }

  getAllClasses() {
    return this.http.get(baseUrl);
  }

  getClassesByTeacher(teacherId) {
    return this.http.get(`${baseUrl}/teacher/${teacherId}`);
  }

  getOneClass(id) {
    return this.http.get(`${baseUrl}/id/${id}`);
  }

  deleteOneClass(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAllClass() {
    return this.http.delete(`${baseUrl}`);
  }

  updateClass(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

}
