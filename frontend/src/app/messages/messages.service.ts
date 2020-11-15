import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessagesService {

  private message: string = null;

  sendMessage(message: string) {
    this.message = message;
  }

  clearMessage() {
    this.message = null;
  }

  getMessage() {
    return this.message;
  }

}
