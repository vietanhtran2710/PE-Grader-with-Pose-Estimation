import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

const baseUrl = 'http://localhost:8080/api/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(data) {
    return this.http.post(baseUrl, data)
  }

  getAllPosts() {
    return this.http.get(baseUrl);
  }

  getAllPostsInClass(classId) {
    return this.http.get(`${baseUrl}/class/${classId}`);
  }

  getAllPostsByTeacher(teacherId) {
    return this.http.get(`${baseUrl}/teacher/${teacherId}`);
  }

  deleteOnePost(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deletePostsInClass(classId) {
    return this.http.delete(`${baseUrl}/class/${classId}`);
  }

  deletePostsByTeacher(teacherId) {
    return this.http.delete(`${baseUrl}/teacher/${teacherId}`)
  }

  deleteAllPosts() {
    return this.http.delete(baseUrl);
  }

  updatePost(postId, data) {
    return this.http.put(`${baseUrl}/${postId}`, data);
  }
}
