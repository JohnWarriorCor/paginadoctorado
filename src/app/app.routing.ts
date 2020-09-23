import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { DocentesComponent } from './components/pages/docentes/docentes.component';
import { FormacionComponent } from './components/pages/formacion/formacion.component';
import { AgendaComponent } from './components/pages/agenda/agenda.component';
import { GruposinvesComponent } from './components/pages/gruposinves/gruposinves.component';
import { EstudiantesComponent } from './components/pages/estudiantes/estudiantes.component';
import { LoginComponent } from './components/admin/login/login.component';
import { EgresadosComponent } from './components/pages/egresados/egresados.component';
import { TesisComponent } from './components/pages/tesis/tesis.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'formacion', component: FormacionComponent },
  { path: 'docentes', component: DocentesComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'gruposinvestigacion', component: GruposinvesComponent },
  { path: 'estudiantes', component: EstudiantesComponent },
  { path: 'egresados', component: EgresadosComponent },
  { path: 'tesis', component: TesisComponent },
  { path: 'adminlogin', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload'});
