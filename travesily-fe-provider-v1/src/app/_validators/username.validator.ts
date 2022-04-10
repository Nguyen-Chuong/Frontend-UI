import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors} from '@angular/forms';
import { AuthService } from "../_services/auth.service";
import { map, Observable, switchMap, timer } from "rxjs";
import { Directive } from "@angular/core";

export function UsernameValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let debounceTime = 1000
    return timer(debounceTime).pipe(switchMap(() => {
      return authService.checkUsernameDuplicated(control.value).pipe(
        map(res => {
          return res['data']  ? { 'duplicateUsername': res['data'] } : null
        })
      )
    }))
  };
}

@Directive({
  selector: '[duplicateUsername][formControlName],[duplicateUsername][formControl],[duplicateUsername][ngModel]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UsernameValidatorDirective, multi: true }]
})
export class UsernameValidatorDirective implements AsyncValidator {
  constructor(private authService: AuthService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return UsernameValidator(this.authService)(control)
  }
}
