import { Component, OnInit } from '@angular/core';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toastr: ToastService) { }


  ngOnInit() {
  }



}
