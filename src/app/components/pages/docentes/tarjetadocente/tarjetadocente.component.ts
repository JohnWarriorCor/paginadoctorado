import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tarjetadocente',
  templateUrl: './tarjetadocente.component.html',
  styleUrls: ['./tarjetadocente.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TarjetadocenteComponent {
  closeResult: string;
  @Input() profesor: any = {};
  @Input() index: number;
  @Output() profesorSeleccionado: EventEmitter<number>;

  constructor(private modalService: NgbModal, private router: Router) {
    this.profesorSeleccionado = new EventEmitter();
  }
  verPelicula() {
    this.router.navigate(['/docente', this.index]);
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal', centered: true });
  }
}
