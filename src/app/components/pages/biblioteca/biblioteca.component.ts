import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BibliotecaService } from '../../../services/biblioteca/biblioteca.service';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BibliotecaComponent implements OnInit, AfterViewInit {
  page = 1;
  pageSize = 4;
  modalReference: any;
  libro: Array<any> = [];
  loading = true;
  filterpost = '';
  biblioteca: any;
  // tslint:disable-next-line:max-line-length
  constructor(
    public auth: AngularFireAuth,
    private bibliotecaService: BibliotecaService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.bibliotecaService.getLibros().subscribe((data) => {
      this.libro = data;
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
  obtenerLibros(): void {
    this.bibliotecaService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.biblioteca = data;
        console.log(this.biblioteca);
      });
  }

  ngOnInit() {
    this.obtenerLibros();
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
    this.bibliotecaService.borrarLibro(key$).subscribe((respuesta) => {
      if (respuesta) {
        console.error(respuesta);
      } else {
        delete this.libro[key$];
        this.modalReference.close();
      }
    });
  }
}
