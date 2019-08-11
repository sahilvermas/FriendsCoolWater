import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {

  options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-bottom-right',
    timeOut: 6000,
  };

  constructor(private toastr: ToastrService) { }

  success(msg: string, title: string = 'Success') {
    this.toastr.success(msg, title, this.options);
  }

  error(msg: string, title: string = 'Error') {
    this.toastr.error(msg, title, this.options);
  }

  warning(msg: string, title: string = 'Warning') {
    this.toastr.warning(msg, title, this.options);
  }

  info(msg: string, title: string = 'Information') {
    this.toastr.info(msg, title, this.options);
  }
}
