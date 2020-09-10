import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-gruposinves',
  templateUrl: './gruposinves.component.html',
  styleUrls: ['./gruposinves.component.css']
})
export class GruposinvesComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    (window as any).twttr.widgets.load();
  }

}
