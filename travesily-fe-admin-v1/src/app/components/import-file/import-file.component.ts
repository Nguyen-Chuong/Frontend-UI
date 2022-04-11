import { FileService } from './../../_services/file.service';
import { CityService } from './../../_services/city.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/_models/city';
import { first } from 'rxjs';
import { CryptoService } from 'src/app/_services/crypto.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.scss']
})
export class ImportFileComponent implements OnInit {
  currentTask= "District"
  cityControl: FormControl
  cities: City[]
  CityId: number
  selectedFiles: FileList
  constructor(
    private citiesService: CityService,
    private fileService: FileService,
    private cryptoService: CryptoService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.cityControl = new FormControl('', Validators.required);
    this.citiesService.getAllCities().pipe(first()).subscribe(res => {
      this.cities = res['data']
    })
  }

  changeCityID(city: City) {
    this.CityId = city.id
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      const encryptedId = this.cryptoService.set('06052000',this.CityId)
      this.fileService.uploadFileExcel(file, encryptedId).pipe(first()).subscribe({
        next: () => {
          this.notificationService.onSuccess('Upload successfully');
          window.location.reload()
        },
        error: err => {
          console.log(err)
          this.notificationService.onError(err['error']['error_message'])
        }
      })
    }
  }
}
