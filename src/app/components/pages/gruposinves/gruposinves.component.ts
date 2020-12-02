import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GruposinvestigacionService } from '../../../services/grupoinvesti/gruposinvestigacion.service';

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
  gruposInv: any = [];
  closeResult: string;
  modalReference: any;
  acumFechas = 0;
  comodinAcum = 0;
  grupoInvestigacion: any[] = [];
  loading = true;
  // Herramientas ocultas
  key: any;
  user: any;
  opciones = false;
  ajustes = true;
  validar = false;
  error = false;
  passError = '';
  // tslint:disable-next-line:max-line-length
  constructor(private grupoInvestigacionService: GruposinvestigacionService, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private router: Router) {
    this.grupoInvestigacionService.getGrupos().subscribe( data => {
      this.grupoInvestigacion = data;
    });
  }
  refresh() {
    window.location.reload();
  }

  openModal(confirmar) {
    this.modalReference = this.modalService.open(confirmar, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'fade-in'});
  }

  ngOnInit() {
    this.gruposInv.push(
      {
        id: 'COL0019991',
        nombre: 'Carlos Finlay',
        lider: 'Nicolás Arturo Núñez Gómez',
        clasi: 'A1'
      },
      {
        id: 'COL0024427',
        nombre: 'Mi Dneuropsy',
        lider: 'Esperanza Cabrera Díaz',
        clasi: 'A1'
      },
      {
        id: 'COL0014556',
        nombre: 'Parasitología y medicina tropical',
        lider: 'Carlos Fernando Narvaez Rojas',
        clasi: 'A1'
      },
      {
        id: 'COL0035331',
        nombre: 'Laboratorio de medicina genómica',
        lider: 'Henry Ostos Alfonso',
        clasi: 'A1'
      },
      {
        id: 'COL0022253',
        nombre: 'Agroindustria',
        lider: 'Nelson Gutiérrez Guzmán',
        clasi: 'A'
      },
      {
        id: 'COL0029379',
        nombre: 'Cuidar',
        lider: 'Dolly Orfilia Arias	',
        clasi: 'A'
      },
      {
        id: 'COL0044063',
        nombre: 'Nuevas visiones del derecho',
        lider: 'German Alfonso López Daza',
        clasi: 'A'
      },
      {
        id: 'COL0022244',
        nombre: 'Ecosistemas sur-colombianos',
        lider: 'Alfredo Olaya Amaya',
        clasi: 'B'
      },
      {
        id: 'COL0001627',
        nombre: 'Culturas, conflictos y subjetividades',
        lider: 'William Fernando Torres S',
        clasi: 'B'
      },
      {
        id: 'COL0047038',
        nombre: 'Salud y grupos vulnerables',
        lider: 'Claudia Andrea Ramírez',
        clasi: 'B'
      },
      {
        id: 'COL0101419',
        nombre: 'Biología de la re-producción',
        lider: 'Manuel García Flórez',
        clasi: 'C'
      },
    );
  }
  ngAfterViewInit(): void {
    (window as any).twttr.widgets.load();
  }
  openSm(formAdmin) {
    this.modalReference = this.modalService.open(formAdmin, { size: 'sm', centered: true, backdrop: 'static' });
  }
  viewOpciones(pass, user) {
    if ( pass === '7183' && user === 'admin' ) {
      this.ajustes = false;
      this.validar = true;
      this.modalReference.close();
    } else {
      if (pass !== '7183' && user !== 'admin') {
        this.error = true;
        this.passError = 'Usuario y contraseña incorrectas';
      } else if (pass !== '7183') {
        this.error = true;
        this.passError = 'Contraseña incorrecta';
      } else {
        this.error = true;
        this.passError = 'Usuario incorrecto';
      }
    }
  }
  borrarGrupo( key$: string) {
    this.grupoInvestigacionService.borrarGrupo(key$).subscribe( respuesta => {
      if ( respuesta ) {
        console.error(respuesta);
      } else {
        delete this.grupoInvestigacion[key$];
        this.modalReference.close();
      }
    });
  }

}
