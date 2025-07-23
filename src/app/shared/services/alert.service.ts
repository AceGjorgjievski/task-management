import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  successMessage: string | null = null;

  setSuccessMessage(message: string) {
    this.successMessage = message;
  }

  getSuccessMessage(): string | null {
    const message = this.successMessage;
    this.successMessage = null;
    return message;
  }
}
