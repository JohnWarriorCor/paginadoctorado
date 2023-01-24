import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import {
  NgbPaginationModule,
  NgbAlertModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";

import {
  MDBBootstrapModule,
  ModalModule,
  WavesModule,
  InputsModule,
  ButtonsModule,
} from "angular-bootstrap-md";
export { MDBBootstrapModule };
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { HeaderComponent } from "./components/shared/header/header.component";
import { APP_ROUTING } from "./app.routing";
import { RouterModule } from "@angular/router";

// Autenticacion Firebase
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthGuardModule } from "@angular/fire/auth-guard";

// Toast
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ToastService } from "./services/toast/toast.service";

import { LightboxModule } from "ngx-lightbox";
import { CrystalLightboxModule } from "@crystalui/angular-lightbox";

// Editor de texto
import { AngularEditorModule } from "@kolkov/angular-editor";

// importar locales
import localeEsCO from "@angular/common/locales/es-CO";
import { DocentesComponent } from "./components/pages/docentes/docentes.component";
import { EstudiantesComponent } from "./components/pages/estudiantes/estudiantes.component";
import { EgresadosComponent } from "./components/pages/estudiantes/egresados/egresados.component";
import { TesisComponent } from "./components/pages/estudiantes/tesis/tesis.component";
import { LoginComponent } from "./components/admin/login-admin/login.component";
import { HistoriaComponent } from "./components/pages/programa/historia/historia.component";
import { UbicacionComponent } from "./components/pages/programa/ubicacion/ubicacion.component";
import { CompetenciasComponent } from "./components/pages/formacion/competencias/competencias.component";
import { PerfilComponent } from "./components/pages/formacion/perfil/perfil.component";
import { OrganigramaComponent } from "./components/pages/programa/organigrama/organigrama.component";
import { NgxPrintModule } from "ngx-print";
import { DomseguroPipe } from "./pipes/domseguro.pipe";
import { KeysfirebasePipe } from "./pipes/keysfirebase.pipe";
import { ListinvertPipe } from "./pipes/listinvert.pipe";
import { DocenteComponent } from "./components/pages/docentes/docente/docente.component";
import { BibliotecaComponent } from "./components/pages/biblioteca/biblioteca.component";
import { EstudianteComponent } from "./components/pages/estudiantes/estudiante/estudiante.component";
import { CarruselComponent } from "./components/pages/carrusel/carrusel.component";
import { EgresadoComponent } from "./components/pages/estudiantes/egresados/egresado/egresado.component";
import { FiltroPipe } from "./pipes/filtro.pipe";
import { FiltroprofesoresPipe } from "./pipes/filtroprofesores.pipe";
import { FiltrogruposinvesPipe } from "./pipes/filtrogruposinves.pipe";
import { FiltrobibliotecaPipe } from "./pipes/filtrobiblioteca.pipe";
import { GaleriaComponent } from "./components/pages/biblioteca/galeria/galeria.component";
import { NoSanitizePipe } from "./pipes/no-sanitize.pipe";
import { FiltrotesisPipe } from "./pipes/filtrotesis.pipe";
import { FiltroarticulosprofesoresPipe } from "./pipes/filtroarticulosprofesores.pipe";
import { FiltroarticulosestudiantesPipe } from "./pipes/filtroarticulosestudiantes.pipe";
import { ArticuloEgresadosComponent } from "./components/pages/estudiantes/egresados/articulo-egresados/articulo-egresados.component";
import { AgendaProgramaComponent } from "./components/pages/agendas/agenda-programa/agenda-programa.component";
import { AgendaInstitucionalComponent } from "./components/pages/agendas/agenda-institucional/agenda-institucional.component";
import { EventoInstitucionalComponent } from "./components/pages/agendas/agenda-institucional/evento-institucional/evento-institucional.component";
import { EventoProgramaComponent } from "./components/pages/agendas/agenda-programa/evento-programa/evento-programa.component";
import { PlanEstudiosComponent } from "./components/pages/formacion/plan-estudios/plan-estudios.component";
import { GrupoInvestigacionComponent } from "./components/pages/grupo-investigacion/grupo-investigacion.component";
import { ArticulosEstudiantesComponent } from "./components/pages/estudiantes/articulos-estudiantes/articulos-estudiantes.component";
import { ArticuloEstudianteComponent } from "./components/pages/estudiantes/articulos-estudiantes/articulo-estudiante/articulo-estudiante.component";
import { ArticuloDetalladoEstudianteComponent } from "./components/pages/estudiantes/articulos-estudiantes/articulo-detallado-estudiante/articulo-detallado-estudiante.component";
import { ArticulosDocentesComponent } from "./components/pages/docentes/articulos-docentes/articulos-docentes.component";
import { ArticuloDocenteComponent } from "./components/pages/docentes/articulos-docentes/articulo-docente/articulo-docente.component";
import { ArticuloDetalladoDocenteComponent } from "./components/pages/docentes/articulos-docentes/articulo-detallado-docente/articulo-detallado-docente.component";
import { EventoInstitucionalAdminComponent } from "./components/admin/agendas-admin/evento-institucional-admin/evento-institucional-admin.component";
import { EventoProgramaAdminComponent } from "./components/admin/agendas-admin/evento-programa-admin/evento-programa-admin.component";
import { BibliotecaAdminComponent } from "./components/admin/biblioteca-admin/biblioteca-admin.component";

import { GruposInvestigacionAdminComponent } from "./components/admin/grupos-investigacion-admin/grupos-investigacion-admin.component";
import { DocentesAdminComponent } from "./components/admin/docentes-admin/docentes-admin.component";
import { ArticuloDocentesAdminComponent } from "./components/admin/docentes-admin/articulo-docentes-admin/articulo-docentes-admin.component";
import { EstudiantesAdminComponent } from "./components/admin/estudiantes-admin/estudiantes-admin.component";
import { EgresadosAdminComponent } from "./components/admin/estudiantes-admin/egresados-admin/egresados-admin.component";
import { TesisAdminComponent } from "./components/admin/estudiantes-admin/tesis-admin/tesis-admin.component";
import { ArticuloEstudiantesAdminComponent } from "./components/admin/estudiantes-admin/articulo-estudiantes-admin/articulo-estudiantes-admin.component";
import { HistoriaAdminComponent } from "./components/admin/programa-admin/historia-admin/historia-admin.component";
import { DenominacionAdminComponent } from "./components/admin/home-admin/denominacion-admin/denominacion-admin.component";
import { CarruselAdminComponent } from "./components/admin/home-admin/carrusel-admin/carrusel-admin.component";
import { PlanEstudiosAdminComponent } from "./components/admin/formacion-admin/plan-estudios-admin/plan-estudios-admin.component";
import { CountUpDirective } from './components/count-up.directive';

// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEsCO, "es-CO");

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    DocentesComponent,
    EstudiantesComponent,
    EgresadosComponent,
    TesisComponent,
    LoginComponent,
    HistoriaComponent,
    UbicacionComponent,
    CompetenciasComponent,
    PerfilComponent,
    OrganigramaComponent,
    DomseguroPipe,
    KeysfirebasePipe,
    ListinvertPipe,
    DocenteComponent,
    BibliotecaComponent,
    EstudianteComponent,
    CarruselComponent,
    EgresadoComponent,
    FiltroPipe,
    FiltroprofesoresPipe,
    FiltrogruposinvesPipe,
    FiltrobibliotecaPipe,
    GaleriaComponent,
    NoSanitizePipe,
    FiltrotesisPipe,
    FiltroarticulosprofesoresPipe,
    FiltroarticulosestudiantesPipe,
    ArticuloEgresadosComponent,
    AgendaProgramaComponent,
    AgendaInstitucionalComponent,
    EventoInstitucionalComponent,
    EventoProgramaComponent,
    PlanEstudiosComponent,
    GrupoInvestigacionComponent,
    ArticulosEstudiantesComponent,
    ArticuloEstudianteComponent,
    ArticuloDetalladoEstudianteComponent,
    ArticulosDocentesComponent,
    ArticuloDocenteComponent,
    ArticuloDetalladoDocenteComponent,
    EventoProgramaAdminComponent,
    EventoInstitucionalAdminComponent,
    BibliotecaAdminComponent,
    HistoriaAdminComponent,
    DenominacionAdminComponent,
    CarruselAdminComponent,
    GruposInvestigacionAdminComponent,
    PlanEstudiosAdminComponent,
    DocentesAdminComponent,
    ArticuloDocentesAdminComponent,
    EstudiantesAdminComponent,
    EgresadosAdminComponent,
    TesisAdminComponent,
    ArticuloEstudiantesAdminComponent,
    CountUpDirective,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    NgbPaginationModule,
    CrystalLightboxModule,
    NgbAlertModule,
    NgbModule,
    FormsModule,
    LightboxModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPrintModule,
    HttpModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ModalModule.forRoot(),
    WavesModule.forRoot(),
    InputsModule.forRoot(),
    ButtonsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AngularEditorModule,
  ],
  exports: [MDBBootstrapModule],
  providers: [{ provide: LOCALE_ID, useValue: "es-CO" }, ToastService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
