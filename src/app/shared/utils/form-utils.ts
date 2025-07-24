import { AbstractControl } from '@angular/forms';

export class FormUtils {
  static getErrors(control: AbstractControl | null) {
    return control?.errors ?? null;
  }

  static isTouchedOrDirty(control: AbstractControl | null) {
    return !!(control?.dirty || control?.touched);
  }
}
