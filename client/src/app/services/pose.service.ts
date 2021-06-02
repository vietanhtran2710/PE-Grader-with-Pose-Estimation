import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

const baseUrl = 'http://localhost:8080/api/pose';

@Injectable({
  providedIn: 'root'
})
export class PoseService {

  constructor(private http: HttpClient) { }

  createPose(data) {
    return this.http.put(baseUrl, data);
  }

  getAllPoses() {
    return this.http.get(baseUrl);
  }

  deleteAllPose() {
    return this.http.delete(baseUrl);
  }

  deleteOnePoses(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  updatePoses(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
