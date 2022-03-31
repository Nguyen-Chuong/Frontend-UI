import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = environment.API_URL;
  constructor(private http: HttpClient) { }

  uploadFileExcel(file: File, cityId: string){
    const params = new HttpParams().append('cityId', cityId);
    let formData:FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}/upload-file-excel-district`, formData, {params: params})
  }
}
