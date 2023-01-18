import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home.component";
import { DocentesComponent } from "./components/pages/docentes/docentes.component";
import { EstudiantesComponent } from "./components/pages/estudiantes/estudiantes.component";
import { LoginComponent } from "./components/admin/login/login.component";
import { EgresadosComponent } from "./components/pages/estudiantes/egresados/egresados.component";
import { TesisComponent } from "./components/pages/estudiantes/tesis/tesis.component";
import { HistoriaComponent } from "./components/pages/programa/historia/historia.component";
import { UbicacionComponent } from "./components/pages/programa/ubicacion/ubicacion.component";
import { CompetenciasComponent } from "./components/pages/formacion/competencias/competencias.component";
import { PerfilComponent } from "./components/pages/formacion/perfil/perfil.component";
import { OrganigramaComponent } from "./components/pages/programa/organigrama/organigrama.component";
import { DocenteComponent } from "./components/pages/docentes/docente/docente.component";
import { BibliotecaComponent } from "./components/pages/biblioteca/biblioteca.component";
import { EstudianteComponent } from "./components/pages/estudiantes/estudiante/estudiante.component";
import { HistoriaeditComponent } from "./components/admin/programa/historiaedit/historiaedit.component";
import { GruposinveseditComponent } from "./components/admin/gruposinvesedit/gruposinvesedit.component";
import { DenominacionComponent } from "./components/admin/home/denominacion/denominacion.component";
import { CarruselComponent } from "./components/admin/home/carrusel/carrusel.component";
import { CarruseleditComponent } from "./components/admin/home/carrusel/carruseledit.component";
import { PlanestudioseditComponent } from "./components/admin/formacion/planestudiosedit/planestudiosedit.component";
import { ArticulosestueditComponent } from "./components/admin/estudiantes/articulos/articulosestuedit.component";
import { EgresadoseditComponent } from "./components/admin/estudiantes/agresados/egresadosedit.component";
import { TesiseditComponent } from "./components/admin/estudiantes/tesis/tesisedit.component";
import { ArticulosproeditComponent } from "./components/admin/profesores/articulos/articulosproedit.component";
import { PlanteleditComponent } from "./components/admin/profesores/plantel/planteledit.component";
import { EgresadoComponent } from "./components/pages/estudiantes/egresados/egresado/egresado.component";
import { ListadoeditComponent } from "./components/admin/estudiantes/listado/listadoedit.component";

import { AuthGuard } from "./guards/auth.guard";
import { GaleriaComponent } from "./components/pages/biblioteca/galeria/galeria.component";
import { ArticuloEgresadosComponent } from "./components/pages/estudiantes/egresados/articulo-egresados/articulo-egresados.component";
import { EventoInstitucionalComponent } from "./components/pages/agendas/agenda-institucional/evento-institucional/evento-institucional.component";
import { EventoProgramaComponent } from "./components/pages/agendas/agenda-programa/evento-programa/evento-programa.component";
import { AgendaProgramaComponent } from "./components/pages/agendas/agenda-programa/agenda-programa.component";
import { AgendaInstitucionalComponent } from "./components/pages/agendas/agenda-institucional/agenda-institucional.component";
import { PlanEstudiosComponent } from "./components/pages/formacion/plan-estudios/plan-estudios.component";
import { GrupoInvestigacionComponent } from "./components/pages/grupo-investigacion/grupo-investigacion.component";
import { ArticuloEstudianteComponent } from "./components/pages/estudiantes/articulos-estudiantes/articulo-estudiante/articulo-estudiante.component";
import { ArticulosEstudiantesComponent } from "./components/pages/estudiantes/articulos-estudiantes/articulos-estudiantes.component";
import { ArticuloDetalladoEstudianteComponent } from "./components/pages/estudiantes/articulos-estudiantes/articulo-detallado-estudiante/articulo-detallado-estudiante.component";
import { ArticulosDocentesComponent } from "./components/pages/docentes/articulos-docentes/articulos-docentes.component";
import { ArticuloDocenteComponent } from "./components/pages/docentes/articulos-docentes/articulo-docente/articulo-docente.component";
import { ArticuloDetalladoDocenteComponent } from "./components/pages/docentes/articulos-docentes/articulo-detallado-docente/articulo-detallado-docente.component";
import { EventoInstitucionalAdminComponent } from './components/admin/agendas-admin/evento-institucional-admin/evento-institucional-admin.component';
import { EventoProgramaAdminComponent } from './components/admin/agendas-admin/evento-programa-admin/evento-programa-admin.component';
import { BibliotecaAdminComponent } from './components/admin/biblioteca-admin/biblioteca-admin.component';

const routes: Routes = [
  // INICIO
  { path: "inicio", component: HomeComponent },
  // PROGRAMA
  { path: "historia", component: HistoriaComponent },
  { path: "organigrama", component: OrganigramaComponent },
  { path: "ubicacion", component: UbicacionComponent },
  // FORMACION
  { path: "plan-de-estudios", component: PlanEstudiosComponent },
  { path: "competencias", component: CompetenciasComponent },
  { path: "perfil", component: PerfilComponent },
  // PROFESORES
  { path: "docentes", component: DocentesComponent },
  { path: "articulos-docentes", component: ArticulosDocentesComponent },
  { path: "docente/:id", component: DocenteComponent },
  { path: "articulo-docente/:id/:idx", component: ArticuloDocenteComponent },
  {
    path: "articulo-docente/:id",
    component: ArticuloDetalladoDocenteComponent,
  },
  // ACTIVDADES
  { path: "agenda-programa", component: AgendaProgramaComponent },
  { path: "agenda-institucional", component: AgendaInstitucionalComponent },
  { path: "evento-programa/:id", component: EventoProgramaComponent },
  { path: "evento-institucional/:id", component: EventoInstitucionalComponent },
  // INVESTIGACION
  { path: "grupos-investigacion", component: GrupoInvestigacionComponent },
  // ESTUDIANDTES
  { path: "estudiantes", component: EstudiantesComponent },
  { path: "estudiante/:id", component: EstudianteComponent },
  { path: "articulos-estudiantes", component: ArticulosEstudiantesComponent },
  {
    path: "articulo-estudiante/:id/:idx",
    component: ArticuloEstudianteComponent,
  },
  {
    path: "articulo-estudiante/:id",
    component: ArticuloDetalladoEstudianteComponent,
  },
  { path: "egresados", component: EgresadosComponent },
  {
    path: "articulo-egresado/:id/:idx",
    component: ArticuloEgresadosComponent,
  },
  { path: "egresado/:id", component: EgresadoComponent },
  { path: "tesis", component: TesisComponent },
  // BIBLIOTECA
  { path: "biblioteca", component: BibliotecaComponent },
  { path: "galeria-imagenes", component: GaleriaComponent },

  // -------------------------------------SECCIÓN ADMINSITRADOR------------------------------------------------------

  // RUTAS ADMINISTRADOR
  { path: "admi_login", component: LoginComponent },
  // INICIO
  {
    path: "admi_denominacion/:id",
    component: DenominacionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi_carrusel",
    component: CarruselComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi_carruselEdit/:id",
    component: CarruseleditComponent,
    canActivate: [AuthGuard],
  },
  // PROGRAMA
  {
    path: "admi_historia/:id",
    component: HistoriaeditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi_organigrama",
    component: OrganigramaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi_ubicacion",
    component: UbicacionComponent,
    canActivate: [AuthGuard],
  },
  // FORMACION
  {
    path: "admi_plandeestudios/:id",
    component: PlanestudioseditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi_competencias",
    component: CompetenciasComponent,
    canActivate: [AuthGuard],
  },
  { path: "admi_perfil", component: PerfilComponent, canActivate: [AuthGuard] },
  // PROFESORES
  { path: "admi_docentes", component: PlanteleditComponent },
  {
    path: "admi_articulosProfesores/:id",
    component: ArticulosproeditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi_plantel/:id",
    component: PlanteleditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi_docente/:id",
    component: DocenteComponent,
    canActivate: [AuthGuard],
  },
  // ACTIVDADES
  {
    path: "admi-evento-institucinal/:id",
    component: EventoInstitucionalAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi-evento-programa/:id",
    component: EventoProgramaAdminComponent,
    canActivate: [AuthGuard],
  },
  // INVESTIGACION
  {
    path: "admi_gruposInvestigacion/:id",
    component: GruposinveseditComponent,
    canActivate: [AuthGuard],
  },
  // ESTUDIANDTES
  {
    path: "admi_estudiantes",
    component: EstudiantesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi_estudiante/:id",
    component: ListadoeditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi_articulosEstudiantes/:id",
    component: ArticulosestueditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi_egresados/:id",
    component: EgresadoseditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi_tesis/:id",
    component: TesiseditComponent,
    canActivate: [AuthGuard],
  },
  // BIBLIOTECA
  {
    path: "admi-biblioteca/:id",
    component: BibliotecaAdminComponent,
    canActivate: [AuthGuard],
  },
  // ROOT
  { path: "**", pathMatch: "full", redirectTo: "inicio" },
];

export const APP_ROUTING = RouterModule.forRoot(routes, {
  useHash: true,
  onSameUrlNavigation: "reload",
});
