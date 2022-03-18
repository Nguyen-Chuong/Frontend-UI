import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAllUserPage(page: number, pageSize: number) {
    const params = new HttpParams()
      .append('page', page)
      .append('pageSize', pageSize);
    return this.http.get(`${this.baseUrl}/get-all-user`, { params: params });
  }

  getAllUser() {
    return this.http.get(`${this.baseUrl}/get-all-user`);
  }

  getAllManager() {
    return this.http.get(`${this.baseUrl}/get-all-manager`);
  }

  deleteManage(id: number) {
    return this.http.patch(`${this.baseUrl}/delete-manager/${id}`, '');
  }
}
