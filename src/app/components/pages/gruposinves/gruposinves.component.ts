import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GruposinvestigacionService } from '../../../services/grupoinvesti/gruposinvestigacion.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gruposinves',
  templateUrl: './gruposinves.component.html',
  styleUrls: ['./gruposinves.component.css'],
  encapsulation: ViewEncapsulation.None,
})

// tslint:disable-next-line:directive-class-suffix
export class GruposinvesComponent implements OnInit, AfterViewInit {
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
  filterpost = '';
  grupos: any;
  actualProfesor = null;

  constructor(
    public auth: AngularFireAuth,
    private grupoInvestigacionService: GruposinvestigacionService,
    private modalService: NgbModal,
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
      size: 'sm',
      backdrop: 'static',
      windowClass: 'fade-in',
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
  ngAfterViewInit(): void {
    (window as any).twttr.widgets.load();
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
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
