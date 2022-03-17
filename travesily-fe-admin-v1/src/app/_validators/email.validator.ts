import { Directive } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable, switchMap, timer } from 'rxjs';
import { AuthServiceService } from '../_services/auth-service.service';

export function EmailValidator(
  authService: AuthServiceService
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let debounceTime = 1000;
    return timer(debounceTime).pipe(
      switchMap(() => {
        return authService.checkEmailDuplicated(control.value).pipe(
          map((res) => {
            return res['data'] ? { duplicateEmail: res['data'] } : null;
          })
        );
      })
    );
  };
}

@Directive({
  selector:
    '[duplicateEmail][formControlName],[duplicateEmail][formControl],[duplicateEmail][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements AsyncValidator {
  constructor(private authService: AuthServiceService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return EmailValidator(this.authService)(control);
  }
}
