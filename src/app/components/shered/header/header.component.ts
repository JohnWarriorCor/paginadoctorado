import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  emailstring = 'mailto:xyz@example.com';
  today = new Date();

  constructor() {
  }

  ngOnInit() {
  }

}
