import {Component, Input, OnInit} from '@angular/core';
import {Account} from "../../../../../../../_models/account";
import {FileUpload} from "../../../../../../../_models/file-upload";
import {FirebaseService} from "../../../../../../../_services/firebase.service";
import {AuthService} from "../../../../../../../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile-details-info',
  templateUrl: './user-profile-details-info.component.html',
  styleUrls: ['./user-profile-details-info.component.scss']
})
export class UserProfileDetailsInfoComponent implements OnInit {
  @Input() account: Account
  @Input() title: string | undefined
  @Input() hasAvatar: boolean | undefined = false
  @Input() detail: string | undefined
  @Input() isEditable: boolean | undefined = true
  @Input() isAdd: boolean | undefined
  @Input() editType: string | undefined
  isEditShow: boolean = false
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  showImage: string

  constructor(private firebaseService: FirebaseService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  dropdown() {
    this.isEditShow = !this.isEditShow
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
    const [file] = event.target.files
    if (file) {
      document.getElementById('preview-image')['src'] = URL.createObjectURL(file)
    }
  }

  upload(): void {
    if (this.selectedFiles) {
      const file = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      this.currentFileUpload = new FileUpload(file);
      this.firebaseService.pushFileToStorage(this.currentFileUpload, 'accounts', this.account.id)
      this.firebaseService.getStorageUrl().subscribe({
        next: rs => {
          this.account.avatar = rs
          this.authService.update(this.account).subscribe(rs => {
            window.location.reload()
          })
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
}
