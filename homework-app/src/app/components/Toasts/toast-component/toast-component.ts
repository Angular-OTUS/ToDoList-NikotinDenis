import { Component, Input } from '@angular/core';
import { Toast } from '../../../interfaces/toast';

export type ToastStatus = 'success' | 'error' | 'info';

@Component({
  selector: 'app-toast-component',
  imports: [],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css',
})
export class ToastComponent {

  @Input() toast: Toast;

  public get backgroundColor() {
    switch (this.toast.status) {
      case 'success':
        return 'rgba(105, 227, 5, 0.486)';
      case 'error':
        return 'rgba(227, 5, 5, 0.486)';
      case 'info':
        return 'rgba(5, 97, 227, 0.486)';
    }
  }

}


