import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HistoriaService } from '../../../../services/programa/historia.service';
import { Historia } from '../../../../interfaces/programa/historia';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Component({
  selector: 'app-historiaedit',
  templateUrl: './historiaedit.component.html',
  styleUrls: ['./historiaedit.component.css']
})
export class HistoriaeditComponent implements OnInit {
  closeResult: string;
  war: any;
  modalReference: any;
  error = false;
  passError = '';
  forma: FormGroup;
  controls: any;
  nuevo = false;
  id: string;
  historia: Historia = {
    reseniaHistorica: '',
  };

  constructor( public auth: AngularFireAuth, private modalService: NgbModal, private historiaServices: HistoriaService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.historiaServices.getHistoria( this.id ).subscribe(historia => this.historia = historia);
      }
    });
  }

  ngOnInit() {
    this.war = this.historia.reseniaHistorica;
  }

  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }

  guardar() {
    if ( this.historia.reseniaHistorica !== this.war ||  this.historia.reseniaHistorica !== this.war ) {
      this.error = false;
      this.modalReference.close();
      if ( this.id === 'nuevo' ) {
        this.historiaServices.nuevoHistoria( this.historia ).subscribe(data => {
          this.router.navigate(['/historia']);
          this.modalReference.close();
        },
        error => console.error(error));
      } else {
        this.modalReference.close();
        this.historiaServices.actualizarHistoria( this.historia, this.id ).subscribe(data => {
          this.router.navigate(['/historia']);
          this.modalReference.close();
        },
        error => console.error(error));
      }
    } else {
      this.error = true;
      this.passError = 'No puede dejar la historía vacía';
      this.modalReference.close();
    }
  }
  agregarNuevo( forma: NgForm) {
    this.router.navigate(['/admi_historia', 'nuevo']);
    forma.reset({});
  }
}
