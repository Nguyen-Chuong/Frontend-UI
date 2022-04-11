import { Injectable } from '@angular/core';
import { finalize, Subject } from 'rxjs';
import { CryptoService } from './crypto.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUpload } from '../_models/file-upload';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private basePath = '/travesily';
  storageUrlSubject: Subject<string> = new Subject<string>()

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private cryptoService: CryptoService
  ) {
  }

  pushFileToStorage(
    fileUpload: FileUpload,
    folder: string,
    subFolder: string,
    id: any
  ) {
    const filePath = `${this.basePath}/${folder}/${subFolder}/${id}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.storageUrlSubject.next(downloadURL)
        });
      })
    ).subscribe()
    // return storageRef.getDownloadURL();
  }

  getStorageUrl() {
    return this.storageUrlSubject.asObservable()
  }

  getFile(avatarUrl: string, id: number) {
    const encryptedId = this.cryptoService.set('06052000', id);
    const storageRef = this.storage.ref(
      `${this.basePath}/${avatarUrl}/${encryptedId}`
    );
    return storageRef.getDownloadURL();
  }

  deleteFile(folder: string,
    subFolder: number) {
    const encryptedId = this.cryptoService.set('06052000', subFolder);
    const folderPath = `${this.basePath}/${folder}/${encryptedId}`;
    this.storage.storage.ref(folderPath).listAll().then(
      data => {
        data.items.forEach(
          item => {
            item.delete()
          });
      })
  }
}
