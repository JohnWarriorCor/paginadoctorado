import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProfesoresService, Profesores } from '../services/profesores.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from '../services/agenda/agenda.service';


// tslint:disable-next-line:prefer-const

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  currentJustify = 'justified';
  g: any;
  today = new Date();
  profesor: any = {};
  agenda: any[] = [];
  activ: any[] = [];
  profesores: Profesores[] = [];
  slides: any = [[]];
  slidesAgenda: any = [[]];
  // tslint:disable-next-line:max-line-length
  constructor(private agendaService: AgendaService, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private profesorService: ProfesoresService, private router: Router) {
    this.activatedRoute.params.subscribe( params => {
      this.profesor = this.profesorService.getProfesor(params.id);
    });
    this.agendaService.getAgendas().subscribe( data => {
      this.agenda = data;
    });
  }
  chunk(arr, chunkSize) {
    // tslint:disable-next-line:prefer-const
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  chunkAgenda(arr, chunkSize) {
    // tslint:disable-next-line:prefer-const
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.profesores = this.profesorService.getProfesores();
    this.g = this.agendaService.getAgendas();
    this.slides = this.chunk(this.profesores, 4);
    this.slidesAgenda = this.chunkAgenda(this.activ, 2);
    console.log(this.profesores);
    console.log(this.slidesAgenda);
  }
  verProfesor( idx: number ) {
    this.router.navigate(['/docente', idx]);
  }
  up() {
    window.scroll(0, 400);
  }
}
