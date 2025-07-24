import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noSpecialCharsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const valid = /^[a-zA-Z0-9 ]*$/.test(value);
    return valid ? null : { noSpecialChars: true };
  };
}
