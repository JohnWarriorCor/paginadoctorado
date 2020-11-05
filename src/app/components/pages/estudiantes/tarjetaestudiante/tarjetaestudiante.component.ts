import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tarjetaestudiante',
  templateUrl: './tarjetaestudiante.component.html',
  styleUrls: ['./tarjetaestudiante.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TarjetaestudianteComponent {
  closeResult: string;
  @Input() estudiante: any = {};
  @Input() index: number;
  @Output() estudianteSeleccionado: EventEmitter<number>;

  constructor(private modalService: NgbModal, private router: Router) {
    this.estudianteSeleccionado = new EventEmitter();
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal', centered: true });
  }
}
