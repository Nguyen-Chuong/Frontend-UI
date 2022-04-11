import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../../../../../../_models/account";
import {AuthService} from "../../../../../../../_services/auth.service";
import {first} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-dropdown-name',
  templateUrl: './edit-dropdown-name.component.html',
  styleUrls: ['./edit-dropdown-name.component.scss']
})
export class EditDropdownNameComponent implements OnInit {
  form: FormGroup
  @Input() account: Account
  @Output() dropdown = new EventEmitter()

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
          Swal.fire('Change name successfully!','','success')
          this.dropdown.emit()
        },
        error: () => {
          Swal.fire('Change name failed!','','error')
        }
      })
    }
  }

  onClear() {
    this.form.reset()
  }
  getErrorMessage(field: string) {
    if (field === 'firstname' && this.form.controls['firstname'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.controls['lastname'].hasError('required') ? 'You must enter a value' : '';
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
}
