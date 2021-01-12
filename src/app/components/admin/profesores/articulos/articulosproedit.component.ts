import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Articulospro } from '../../../../interfaces/profesores/articulospro/articulospro';
import { ArticulosproService } from '../../../../services/profesores/articulospro/articulospro.service';

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
  constructor(public datepipe: DatePipe, private modalService: NgbModal, private articulosProService: ArticulosproService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( parametros => {
      this.id = parametros.id;
      if ( this.id !== 'nuevo' ) {
        this.articulosProService.getArticuloProfesor( this.id ).subscribe(articulosPro => this.articulosPro = articulosPro);
      }
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
    this.newAttribute = {};
   }

   deleteFieldValue(index) {
    this.articulosPro.fieldArray.splice(index, 1);
   }
   guardar() {
    if ( this.articulosPro.fieldArray[0] !== this.war ||  this.articulosPro.fieldArray[0] !== this.war ) {
      this.error = false;
      this.modalReference.close();
      if ( this.id === 'nuevo' ) {
        this.articulosProService.nuevoArticuloProfesor( this.articulosPro ).subscribe(data => {
          this.router.navigate(['/plandeestudios']);
          this.modalReference.close();
        },
        error => console.error(error));
      } else {
        this.modalReference.close();
        this.articulosProService.actualizarArticuloProfesor( this.articulosPro, this.id ).subscribe(data => {
          this.router.navigate(['/plandeestudios']);
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
    this.router.navigate(['/admi_plandeestudios', 'nuevo']);
    forma.reset({});
  }
}
