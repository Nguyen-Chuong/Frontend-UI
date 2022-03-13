import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../../../../../../_models/account";
import {AuthService} from "../../../../../../../_services/auth.service";
import {first} from "rxjs";
import {AlertService} from "../../../../../../../_services/alert.service";

@Component({
  selector: 'app-edit-dropdown-name',
  templateUrl: './edit-dropdown-name.component.html',
  styleUrls: ['./edit-dropdown-name.component.scss']
})
export class EditDropdownNameComponent implements OnInit {
  form: FormGroup
  @Input() account: Account
  @Output() dropdown = new EventEmitter()

  constructor(private fb: FormBuilder, private authService: AuthService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: [this.account?.firstname, [Validators.required]],
      lastname: [this.account?.lastname, [Validators.required]]
    })
  }

  onSubmit() {
    const val = this.form.value
    if (val.firstname && val.lastname) {
      this.account.firstname = val.firstname
      this.account.lastname = val.lastname
      this.authService.update(this.account).pipe(first()).subscribe({
        next: () => {
          this.alertService.success('Change Name Successfully')
          this.dropdown.emit()
        },
        error: err => {
          this.alertService.error(err)
        }
      })
    }
  }

  onClear() {
    this.form.reset()
  }
}
