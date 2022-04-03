import {Component, Input, OnInit} from '@angular/core';
import {Account} from "../../../../../../../_models/account";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../../../_services/auth.service";
import {first} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-dropdown-add-phone',
  templateUrl: './edit-dropdown-add-phone.component.html',
  styleUrls: ['./edit-dropdown-add-phone.component.scss']
})
export class EditDropdownAddPhoneComponent implements OnInit {
  @Input() account: Account
  form: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
          Swal.fire('Add phone successfully!','','success')
        },
        error: err => {
          Swal.fire('Add phone failed!','','error')
        }
      })
    }
  }
}
