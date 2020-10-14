import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


import { MDBBootstrapModule } from 'angular-bootstrap-md';
export { MDBBootstrapModule };
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { FooterComponent } from './components/shered/footer/footer.component';
import { HeaderComponent } from './components/shered/header/header.component';
import { APP_ROUTING } from './app.routing';
import { RouterModule } from '@angular/router';


// importar locales
import localeEsCO from '@angular/common/locales/es-CO';
import { FormacionComponent } from './components/pages/formacion/formacion.component';
import { DocentesComponent } from './components/pages/docentes/docentes.component';
import { AgendaComponent } from './components/pages/agenda/agenda.component';
import { EstudiantesComponent } from './components/pages/estudiantes/estudiantes.component';
import { GruposinvesComponent } from './components/pages/gruposinves/gruposinves.component';
import { EgresadosComponent } from './components/pages/estudiantes/egresados/egresados.component';
import { TesisComponent } from './components/pages/estudiantes/tesis/tesis.component';
import { LoginComponent } from './components/admin/login/login.component';
import { GruposinveseditComponent } from './components/admin/gruposinvesedit/gruposinvesedit.component';
import { ProgramaComponent } from './components/pages/programa/programa.component';
import { HistoriaComponent } from './components/pages/programa/historia/historia.component';
import { UbicacionComponent } from './components/pages/programa/ubicacion/ubicacion.component';
import { PlanestudiosComponent } from './components/pages/formacion/planestudios/planestudios.component';
import { CompetenciasComponent } from './components/pages/formacion/competencias/competencias.component';
import { PerfilComponent } from './components/pages/formacion/perfil/perfil.component';
import { OrganigramaComponent } from './components/pages/programa/organigrama/organigrama.component';

// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEsCO, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    FormacionComponent,
    DocentesComponent,
    AgendaComponent,
    EstudiantesComponent,
    GruposinvesComponent,
    EgresadosComponent,
    TesisComponent,
    LoginComponent,
    GruposinveseditComponent,
    ProgramaComponent,
    HistoriaComponent,
    UbicacionComponent,
    PlanestudiosComponent,
    CompetenciasComponent,
    PerfilComponent,
    OrganigramaComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    FormsModule,
    RouterModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports: [
    MDBBootstrapModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
