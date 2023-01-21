import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home.component";
import { DocentesComponent } from "./components/pages/docentes/docentes.component";
import { EstudiantesComponent } from "./components/pages/estudiantes/estudiantes.component";
import { LoginComponent } from "./components/admin/login-admin/login.component";
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
import { CarruselComponent } from "./components/pages/carrusel/carrusel.component";
import { EgresadoComponent } from "./components/pages/estudiantes/egresados/egresado/egresado.component";

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
import { EventoInstitucionalAdminComponent } from "./components/admin/agendas-admin/evento-institucional-admin/evento-institucional-admin.component";
import { EventoProgramaAdminComponent } from "./components/admin/agendas-admin/evento-programa-admin/evento-programa-admin.component";
import { BibliotecaAdminComponent } from "./components/admin/biblioteca-admin/biblioteca-admin.component";
import { HistoriaAdminComponent } from "./components/admin/programa-admin/historia-admin/historia-admin.component";
import { DenominacionAdminComponent } from "./components/admin/home-admin/denominacion-admin/denominacion-admin.component";
import { CarruselAdminComponent } from "./components/admin/home-admin/carrusel-admin/carrusel-admin.component";
import { GruposInvestigacionAdminComponent } from "./components/admin/grupos-investigacion-admin/grupos-investigacion-admin.component";
import { PlanEstudiosAdminComponent } from "./components/admin/formacion-admin/plan-estudios-admin/plan-estudios-admin.component";
import { DocentesAdminComponent } from "./components/admin/docentes-admin/docentes-admin.component";
import { ArticuloDocentesAdminComponent } from "./components/admin/docentes-admin/articulo-docentes-admin/articulo-docentes-admin.component";
import { EstudiantesAdminComponent } from "./components/admin/estudiantes-admin/estudiantes-admin.component";
import { EgresadosAdminComponent } from "./components/admin/estudiantes-admin/egresados-admin/egresados-admin.component";
import { TesisAdminComponent } from "./components/admin/estudiantes-admin/tesis-admin/tesis-admin.component";

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
  // DOCENTES
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
  { path: "admi-login", component: LoginComponent },
  // INICIO
  {
    path: "admi-denominacion/:id",
    component: DenominacionAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi-carrusel",
    component: CarruselComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi-carrusel/:id",
    component: CarruselAdminComponent,
    canActivate: [AuthGuard],
  },
  // PROGRAMA
  {
    path: "admi-historia/:id",
    component: HistoriaAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi-organigrama",
    component: OrganigramaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi-ubicacion",
    component: UbicacionComponent,
    canActivate: [AuthGuard],
  },
  // FORMACION
  {
    path: "admi-plan-de-estudios/:id",
    component: PlanEstudiosAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi-competencias",
    component: CompetenciasComponent,
    canActivate: [AuthGuard],
  },
  { path: "admi-perfil", component: PerfilComponent, canActivate: [AuthGuard] },
  // DOCENTES
  { path: "admi-docentes", component: DocentesAdminComponent },
  {
    path: "admi-articulos-docentes/:id",
    component: ArticuloDocentesAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi-docentes/:id",
    component: DocentesAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi-docente/:id",
    component: DocenteComponent,
    canActivate: [AuthGuard],
  },
  // ACTIVDADES
  {
    path: "admi-evento-institucional/:id",
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
    path: "admi-grupos-investigacion/:id",
    component: GruposInvestigacionAdminComponent,
    canActivate: [AuthGuard],
  },
  // ESTUDIANDTES
  {
    path: "admi-estudiantes",
    component: EstudiantesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi-estudiante/:id",
    component: EstudiantesAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi-articulos-estudiantes/:id",
    component: ArticulosEstudiantesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi-egresados/:id",
    component: EgresadosAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admi-tesis/:id",
    component: TesisAdminComponent,
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
