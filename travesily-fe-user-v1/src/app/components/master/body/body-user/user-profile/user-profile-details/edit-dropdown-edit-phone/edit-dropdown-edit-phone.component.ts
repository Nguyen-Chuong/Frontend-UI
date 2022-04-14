import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account} from "../../../../../../../_models/account";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import Swal from "sweetalert2";
import {AuthService} from "../../../../../../../_services/auth.service";

@Component({
  selector: 'app-edit-dropdown-edit-phone',
  templateUrl: './edit-dropdown-edit-phone.component.html',
  styleUrls: ['./edit-dropdown-edit-phone.component.scss']
})
export class EditDropdownEditPhoneComponent implements OnInit {
  @Input() account: Account
  @Output() dropdown = new EventEmitter()
  form: FormGroup
  constructor(private fb: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      phone: ['', [Validators.required,Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]]
    })
  }

  onSubmit() {
    const val = this.form.value
    if(val.phone){
      this.account.phone = val.phone
      this.authService.update(this.account).pipe(first()).subscribe({
        next: () => {
          Swal.fire('Your phone number has been updated!','','success')
          this.dropdown.emit()
          this.form.reset()
        },
        error: err => {
          Swal.fire('Update phone failed!','','error')
        }
      })
    }
  }

  getErrorMessage(field: string) {
    if (field === 'phone' && this.form.controls['phone'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.controls['phone'].hasError('pattern') ? 'Wrong phone format!' : '';
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

}
