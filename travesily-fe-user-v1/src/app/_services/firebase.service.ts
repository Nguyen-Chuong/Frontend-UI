import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Observable} from "rxjs";
import {FileUpload} from "../_models/file-upload";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {CryptoService} from "./crypto.service";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private basePath = '/travesily';
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private cryptoService: CryptoService) { }
  pushFileToStorage(fileUpload: FileUpload, folder: string, id: number): Observable<string> {
    const encryptedId = this.cryptoService.set('06052000',id)
    const filePath = `${this.basePath}/${folder}/${encryptedId}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
    return storageRef.getDownloadURL()
  }

  getFile(avatarUrl: string, id: number){
    const encryptedId = this.cryptoService.set('06052000',id)
    const storageRef = this.storage.ref(`${this.basePath}/${avatarUrl}/${encryptedId}`)
    return storageRef.getDownloadURL()
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }
  getFiles(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }
  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }
  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }
  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
