import { Component, OnInit, AfterViewInit } from '@angular/core';
// tslint:disable-next-line:prefer-const

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit, AfterViewInit {
  currentJustify = 'justified';
  today = new Date();
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    (window as any).twttr.widgets.load();
  }
}
