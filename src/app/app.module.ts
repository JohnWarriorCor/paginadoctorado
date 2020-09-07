import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


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
    GruposinvesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    FormsModule,
    RouterModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
