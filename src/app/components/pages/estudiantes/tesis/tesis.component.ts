import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TesisService } from '../../../../services/estudiantes/tesis/tesis.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tesis',
  templateUrl: './tesis.component.html',
  styleUrls: ['./tesis.component.css'],
})
export class TesisComponent implements OnInit {
  filterpost = '';
  page = 1;
  pageSize = 4;
  vistaEdicion = false;
  today = new Date();
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  tesis: Array<any> = [];
  tesisEstudiantes: any[] = [];
  loading = true;

  constructor(
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    private tesisService: TesisService,
    private modalService: NgbModal
  ) {
    this.tesisService.getTesis().subscribe((data) => {
      this.tesis = data;
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
  obtenerTesis(): void {
    this.tesisService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.tesisEstudiantes = data;
      });
  }

  ngOnInit() {
    this.obtenerTesis();
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
    });
  }

  borrarGrupo(key$: string) {
    this.tesisService.borrarTesi(key$).subscribe((respuesta) => {
      if (respuesta) {
        console.error(respuesta);
      } else {
        delete this.tesis[key$];
        this.modalReference.close();
      }
    });
  }
}
