import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequest = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.busyRequest++;
    this.spinnerService.show();
  }

  idle() {
    this.busyRequest--;
    if(this.busyRequest <= 0) {  
      this.busyRequest--;
      this.spinnerService.hide();
    }
  }

  close() {
    this.busyRequest = 0;
    this.spinnerService.hide();
  }
  
}