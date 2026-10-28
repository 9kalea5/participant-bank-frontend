import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-loading-modal',
  styleUrl: './loading-modal.css',
  templateUrl: './loading-modal.html',
})
export class LoadingModal {
  @Input() message = 'Please wait...'
}
