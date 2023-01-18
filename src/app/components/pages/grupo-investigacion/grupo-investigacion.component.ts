import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GruposinvestigacionService } from "../../../services/grupoinvesti/gruposinvestigacion.service";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/auth";
import { map } from "rxjs/operators";

@Component({
  selector: "app-grupo-investigacion",
  templateUrl: "./grupo-investigacion.component.html",
  styleUrls: ["./grupo-investigacion.component.css"],
})
export class GrupoInvestigacionComponent implements OnInit {
  page = 1;
  pageSize = 4;
  vistaEdicion = false;
  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  grupoInvestigacion: Array<any> = [];
  loading = true;
  filterpost = "";
  grupos: any[] = [];
  actualProfesor = null;

  constructor(
    public auth: AngularFireAuth,
    private grupoInvestigacionService: GruposinvestigacionService,
    private modalService: NgbModal
  ) {
    this.grupoInvestigacionService.getGrupos().subscribe((data) => {
      this.grupoInvestigacion = data;
    });
  }
  refresh() {
    window.location.reload();
  }

  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, {
      centered: true,
      size: "sm",
      backdrop: "static",
      windowClass: "fade-in",
    });
  }
  obtenerGrupos(): void {
    this.grupoInvestigacionService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.grupos = data;
        console.log(this.grupos);
      });
  }

  ngOnInit() {
    this.obtenerGrupos();
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, {
      size: "sm",
      centered: true,
      backdrop: "static",
    });
  }

  borrarGrupo(key$: string) {
    this.grupoInvestigacionService.borrarGrupo(key$).subscribe((respuesta) => {
      if (respuesta) {
        console.error(respuesta);
      } else {
        delete this.grupoInvestigacion[key$];
        this.modalReference.close();
      }
    });
  }
}
