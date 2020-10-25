import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  open = false;
  emailstring = 'mailto:doctoradoencienciasdelasalud@usco.edu.co';
  today = new Date();

  constructor() {
  }

  ngOnInit() {
  }

}
