import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-alert',
  styleUrl: './alert.css',
  templateUrl: './alert.html',
})
export class Alert {
  @Input() type: 'success' | 'error' = 'success'
  @Input() message = ''
}
