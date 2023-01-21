import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormGroup, NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CarruselService } from "../../../services/home/carrusel/carrusel.service";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { ToastrService } from "ngx-toastr";
import { map } from 'rxjs/operators';
import { FilesService } from "../../../services/upload/file.service";

@Component({
  selector: "app-carrusel",
  templateUrl: "./carrusel.component.html",
  styleUrls: ["./carrusel.component.css"],
  providers: [DatePipe],
})
export class CarruselComponent implements OnInit {
  today = new Date();
  fecha: any;
  closeResult: string;
  defaultImgUrl: any;
  urlimg: any;
  war: any;
  modalReference: any;
  error = false;
  passError = "";
  imgError = "";
  alertBool = false;
  forma: FormGroup;
  controls: any;
  nuevo = false;
  id: string;
  carrusel: any[] = [];
  public nombreArchivo = "";

  constructor(
    private firebaseStorage: FilesService,
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private carruselServices: CarruselService
  ) {
    /* this.carruselServices.getCarruseles().subscribe((data) => {
      this.carrusel = data;
    }); */
  }

  ngOnInit() {
    this.obtenerCarrusel();
  }

  get sortDataCarrusel() {
    return this.carrusel.sort((a, b) => {
      return <any>new Date(b.fecha) - <any>new Date(a.fecha);
    });
  }

  obtenerCarrusel(): void {
    this.carruselServices
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.carrusel = data;
      });
  }

  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, {
      centered: true,
      size: "sm",
      backdrop: "static",
      windowClass: "fade-in",
    });
  }
  elementoEliminado() {
    this.toastr.warning("", "Elemento eliminado", {
      timeOut: 2500,
    });
  }
  borrarCarrusel(key$: string) {
    this.nombreArchivo = "CARRUSEL/";
    this.firebaseStorage.deleteFileStorage(
      this.nombreArchivo,
      this.carrusel[key$].nameImg
    );
    this.carruselServices.borrarCarrusel(key$).subscribe((respuesta) => {
      if (respuesta) {
        console.error(respuesta);
      } else {
        delete this.carrusel[key$];
        this.elementoEliminado();
        this.modalReference.close();
        window.location.reload();
      }
    });
  }
}
