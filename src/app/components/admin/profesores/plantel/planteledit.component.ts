import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlantelService } from '../../../../services/profesores/plantel/plantel.service';
import { Plantel } from '../../../../interfaces/profesores/plantel/plantel';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastService } from '../../../../services/toast/toast.service';
import { ToastrService } from 'ngx-toastr';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilesService } from '../../../../services/upload/file.service';

@Component({
  selector: 'app-planteledit',
  templateUrl: './planteledit.component.html',
  styleUrls: ['./planteledit.component.css'],
  providers: [DatePipe, NgbProgressbarConfig],
})
export class PlanteleditComponent implements OnInit {
  page = 1;
  pageSize = 3;
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
  plantelProfesor: Plantel = {
    foto: '',
    nombre: '',
    sintesis: '',
    fieldArray: [],
    correo: '',
    fecha: '',
    cvlac: '',
    orcid: '',
  };
  // CARGA DE ARCHIVOS A FIRESTORE CONTENIDO CURRICULAR
  public mensajeArchivo = 'No hay un archivo';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  constructor(
    private firebaseStorage: FilesService,
    private myToast: ToastService,
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private plantelService: PlantelService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((parametros) => {
      this.id = parametros.id;
      if (this.id !== 'nuevo') {
        this.plantelService
          .getPlantel(this.id)
          .subscribe(
            (plantelProfesor) => (this.plantelProfesor = plantelProfesor)
          );
      }
    });
  }
  imgChange() {
    this.toastr.info('', 'Imagen cambiada con éxito', {
      timeOut: 2500,
    });
  }
  imgNone() {
    this.toastr.error(
      'No puede dejar un evento sin imagen, por favor inserte un URL correspondiente',
      'Error',
      {
        timeOut: 2500,
      }
    );
  }
  showSuccess() {
    this.toastr.success('Acción exitosa', 'Elemento guardado', {
      timeOut: 2500,
    });
  }
  showDanger() {
    this.toastr.error('Intenten nuevamente', 'Error al guardar', {
      timeOut: 2500,
    });
  }
  showInfo() {
    this.toastr.info('', 'Elemento actualizado', {
      timeOut: 2500,
    });
  }
  showWarning() {
    this.toastr.warning('Intenten nuevamente', 'Error al actualizar', {
      timeOut: 2500,
    });
  }
  elementoAgregado() {
    this.toastr.info('', 'Elemento agregado', {
      timeOut: 2500,
    });
  }
  elementoEliminado() {
    this.toastr.warning('', 'Elemento eliminado', {
      timeOut: 2500,
    });
  }

  ngOnInit() {
    this.war = this.plantelProfesor.nombre;
    if (
      this.plantelProfesor.foto === null ||
      this.plantelProfesor.foto === ''
    ) {
      // tslint:disable-next-line:max-line-length
      this.defaultImgUrl =
        'https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/NO%20MODIFICAR%2Fperfil_prueba.png?alt=media&token=d1fff1b2-b9eb-4536-866a-ba6720887f02';
      this.plantelProfesor.foto = this.defaultImgUrl;
      return this.plantelProfesor.foto;
    }
    this.fecha = this.datepipe.transform(this.today, 'dd/MM/yyyy');
  }
  addFieldValue() {
    this.plantelProfesor.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
    this.elementoAgregado();
  }

  deleteFieldValue(index) {
    this.plantelProfesor.fieldArray.splice(index, 1);
    this.elementoEliminado();
  }
  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, {
      centered: true,
      size: 'sm',
      backdrop: 'static',
      windowClass: 'fade-in',
    });
  }
  changeImg(urlimg) {
    console.log(urlimg);
    // tslint:disable-next-line:max-line-length
    if (urlimg === '' || urlimg === null) {
      this.defaultImgUrl = urlimg;
      this.alertBool = true;
      this.imgNone();
    } else {
      this.alertBool = false;
      this.defaultImgUrl = urlimg;
      this.imgChange();
      return this.defaultImgUrl;
    }
  }
  imgMujer() {
    this.plantelProfesor.foto =
      'https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/NO%20MODIFICAR%2Fperfil_mujer.png?alt=media&token=62e21016-cb7e-4bcc-a1c6-af5ee2f71188';
    this.imgChange();
  }
  imgHombre() {
    this.plantelProfesor.foto =
      'https://firebasestorage.googleapis.com/v0/b/doctoradocienciasdelasaludusco.appspot.com/o/NO%20MODIFICAR%2Fperfil_hombre.png?alt=media&token=6a9058fa-e8a5-4d75-83de-202c11ea1053';
    this.imgChange();
  }
  guardar() {
    if (
      this.plantelProfesor.nombre !== this.war ||
      this.plantelProfesor.nombre !== this.war
    ) {
      this.error = false;
      console.log(this.plantelProfesor.nombre);
      console.log(this.war);
      // this.modalReference.close();
      if (this.id === 'nuevo') {
        this.plantelService.nuevoPlantel(this.plantelProfesor).subscribe(
          (data) => {
            this.showSuccess();
            this.modalReference.close();
            this.router.navigate(['/docentes']);
          },
          (error) => console.error(error, this.showDanger())
        );
      } else {
        this.modalReference.close();
        this.plantelService
          .actualizarPlantel(this.plantelProfesor, this.id)
          .subscribe(
            (data) => {
              this.showInfo();
              this.router.navigate(['/docente', this.id]);
              this.modalReference.close();
            },
            (error) => console.error(error, this.showWarning())
          );
      }
    } else {
      this.error = true;
      this.passError = 'Formulario incompleto.';
      this.modalReference.close();
    }
  }
  up() {
    window.scroll(0, 400);
  }
  agregarNuevo(forma: NgForm) {
    this.router.navigate(['/admi_plantel', 'nuevo']);
    forma.reset({});
    this.up();
  }
  // Función para subir el archivo a Cloud Storage referenciado con la ruta de acceso
  subirArchivo() {
    this.nombreArchivo = 'PROFESORES/' + this.nombreArchivo;
    const archivo = this.datosFormulario.get('archivo');
    const referencia = this.firebaseStorage.referenciaCloudStorage(
      this.nombreArchivo
    );
    const cargar = this.firebaseStorage.cargarCloudStorage(
      this.nombreArchivo,
      archivo
    );
    // Cambia el porcentaje
    cargar.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje === 100) {
        setTimeout(() => {
          referencia.getDownloadURL().subscribe((URL) => {
            this.URLPublica = URL;
            this.finalizado = true;
            this.plantelProfesor.foto = this.URLPublica;
            return [
              this.URLPublica,
              this.finalizado,
              this.plantelProfesor.foto,
            ];
          });
        }, 1000);
      }
    });
  }
  // Evento que gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append(
          'archivo',
          event.target.files[i],
          event.target.files[i].name
        );
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }
}
