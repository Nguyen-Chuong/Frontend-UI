import { PostRequest } from './../_models/postRequest';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAllRequest() {
    return this.http.get(`${this.baseUrl}/provider/view-request`);
  }

  cancelRequest(id: any) {
    const params = new HttpParams().append('requestId', id);
    return this.http.patch(
      `${this.baseUrl}/provider/cancel-request`,
      undefined,
      { params: params }
    );
  }

  addRequest(postRequest: PostRequest) {
    return this.http.post(`${this.baseUrl}/add-request`, { ...postRequest });
  }
}
