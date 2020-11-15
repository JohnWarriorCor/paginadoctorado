import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProfesoresService, Profesores } from '../services/profesores.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// tslint:disable-next-line:prefer-const

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbModal]
})

export class HomeComponent implements OnInit, AfterViewInit {
  currentJustify = 'justified';
  today = new Date();
  profesor: any = {};
  profesores: Profesores[] = [];
  slides: any = [[]];
  // tslint:disable-next-line:max-line-length
  constructor(private modalService: NgbModal, private activatedRoute: ActivatedRoute, private profesorService: ProfesoresService, private router: Router) {
    this.activatedRoute.params.subscribe( params => {
      this.profesor = this.profesorService.getProfesor(params.id);
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  chunk(arr, chunkSize) {
    // tslint:disable-next-line:prefer-const
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.profesores = this.profesorService.getProfesores();
    this.slides = this.chunk(this.profesores, 4);
  }
  verProfesor( idx: number ) {
    this.router.navigate(['/docente', idx]);
  }
  up() {
    window.scroll(0, 400);
  }
  ngAfterViewInit(): void {
    (window as any).twttr.widgets.load();
  }
}
