import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HistoriaService } from '../../../../services/programa/historia.service';
import { Historia } from '../../../../interfaces/programa/historia';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastService } from '../../../../services/toast/toast.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor( private myToast: ToastService, private toastr: ToastrService, public auth: AngularFireAuth, private modalService: NgbModal, private historiaServices: HistoriaService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.historiaServices.getHistoria( this.id ).subscribe(historia => this.historia = historia);
      }
    });
  }

  showSuccess() {
    this.toastr.success('Acción exitosa', 'Elemento guardado', {
      timeOut: 2500
    });
  }
  showDanger() {
    this.toastr.error('Intenten nuevamente', 'Error al guardar', {
      timeOut: 2500
    });
  }
  showInfo() {
    this.toastr.info( 'Acción exitosa', 'Elemento actualizado', {
      timeOut: 2500
    });
  }
  showWarning() {
    this.toastr.warning( 'Intenten nuevamente', 'Error al actualizar', {
      timeOut: 2500
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
          this.showSuccess();
          this.router.navigate(['/historia']);
          this.modalReference.close();
        },
        error => console.error(error, this.showDanger()));
      } else {
        this.modalReference.close();
        this.historiaServices.actualizarHistoria( this.historia, this.id ).subscribe(data => {
          this.showInfo();
          this.router.navigate(['/historia']);
          this.modalReference.close();
        },
        error => console.error(error, this.showWarning()));
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
