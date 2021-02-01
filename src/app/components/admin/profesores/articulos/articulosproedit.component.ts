import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Articulospro } from '../../../../interfaces/profesores/articulospro/articulospro';
import { ArticulosproService } from '../../../../services/profesores/articulospro/articulospro.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastService } from '../../../../services/toast/toast.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-articulosproedit',
  templateUrl: './articulosproedit.component.html',
  styleUrls: ['./articulosproedit.component.css'],
  providers: [DatePipe]
})
export class ArticulosproeditComponent implements OnInit {

  today = new Date();
  fecha: any;
  closeResult: string;
  defaultImgUrl: any;
  urlimg: any;
  war: any;
  modalReference: any;
  error = false;
  passError = '';
  imgError = '';
  alertBool = false;
  forma: FormGroup;
  controls: any;
  nuevo = false;
  id: string;

  newAttribute: any = {};
  articulosPro: Articulospro = {
    fieldArray: [],
  };

  // tslint:disable-next-line:max-line-length
  constructor( private myToast: ToastService, private toastr: ToastrService, public auth: AngularFireAuth, public datepipe: DatePipe, private modalService: NgbModal, private articulosProService: ArticulosproService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.articulosProService.getArticuloProfesor( this.id ).subscribe(articulosPro => this.articulosPro = articulosPro);
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
    this.toastr.info( '', 'Elemento actualizado', {
      timeOut: 2500
    });
  }
  showWarning() {
    this.toastr.warning( 'Intenten nuevamente', 'Error al actualizar', {
      timeOut: 2500
    });
  }
  elementoAgregado() {
    this.toastr.info( '', 'Elemento agregado', {
      timeOut: 2500
    });
  }
  elementoEliminado() {
    this.toastr.warning( '', 'Elemento eliminado', {
      timeOut: 2500
    });
  }

  ngOnInit() {
    this.fecha = this.datepipe.transform(this.today, 'dd/MM/yyyy');
    this.war = this.articulosPro.fieldArray[0];
  }
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }
  addFieldValue() {
    this.articulosPro.fieldArray.push(this.newAttribute);
    this.elementoAgregado();
    this.newAttribute = {};
   }

   deleteFieldValue(index) {
    this.articulosPro.fieldArray.splice(index, 1);
    this.elementoEliminado();
   }
   guardar() {
    if ( this.articulosPro.fieldArray[0] !== this.war ||  this.articulosPro.fieldArray[0] !== this.war ) {
      this.error = false;
      this.modalReference.close();
      if ( this.id === 'nuevo' ) {
        this.articulosProService.nuevoArticuloProfesor( this.articulosPro ).subscribe(data => {
          this.showSuccess();
          this.router.navigate(['/articulosProfesores']);
          this.modalReference.close();
        },
        error => console.error(error, this.showDanger()));
      } else {
        this.modalReference.close();
        this.articulosProService.actualizarArticuloProfesor( this.articulosPro, this.id ).subscribe(data => {
          this.showInfo();
          this.router.navigate(['/articulosProfesores']);
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
    this.router.navigate(['/admi_plandeestudios', 'nuevo']);
    forma.reset({});
  }
}
