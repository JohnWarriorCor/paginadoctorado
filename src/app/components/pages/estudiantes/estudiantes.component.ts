import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EstudiantesService, Estudiantes } from '../../../services/estudiantes.service';
import { Router } from '@angular/router';
import { AgendaService } from '../../../services/agenda/agenda.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  estudiantes: any = [];
  estudiantes2: any = [];
  page = 1;
  pageSize = 4;
  agenda: any[] = [];


  constructor(private estudiantesService: EstudiantesService, private router: Router, private agendaService: AgendaService) {
    this.agendaService.getAgendas().subscribe( data => {
      this.agenda = data;
    });
  }

  ngOnInit() {
    this.estudiantes = this.estudiantesService.getEstudiantes();
    this.estudiantes2.push(
      {
        id: '1',
        foto: '/assets/perfil_dolly_arias.png',
        nombre: 'Dolly Arias Torres',
        // tslint:disable-next-line:max-line-length
        sintesis: 'Enfermera, Magíster en Educación y Desarrollo Comunitario, Doctora en Ciencias de la Salud y estancia posdoctoral en Salud de Colectivos. Profesora titular, tiempo completo de planta e investigadora de la Universidad Surcolombiana. Líder del Grupo de Investigación “Cuidar”, Categoría A de Minciencias, Coordinadora del Doctorado en Ciencias de la Salud desde 2016. Con amplia experiencia profesional en docencia e investigación en los campos de la Salud Comunitaria y la Salud de Pobalciones. Par evaluadora de Minciencias y del Ministerio de Educación Nacional (CNA y CONACES).',
        correo: 'dolaria@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000574422',
        orcid: 'https://orcid.org/signin',
      },
      {
        id: '2',
        foto: '/assets/perfil_alba_valencia.png',
        nombre: 'Alba Rocio Valencia Valderrama',
        // tslint:disable-next-line:max-line-length
        sintesis: 'Doctorado - DOCTORADO EN ANTROPOLOGIA - Graduado Maestría - MAESTRIA EN MORFOLOGIA - Graduado Profesional - LICENCIATURA EN BIOLOGIA Y QUIMICA - Graduado Básica secundaria Estudio en el Exterior - Maestría en Antropología Física y Forense - Graduado',
        correo: 'albarocio.valencia@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '3',
        foto: '/assets/perfil_alfredo_olaya.png',
        nombre: 'Alfredo Olaya Amaya',
        // tslint:disable-next-line:max-line-length
        sintesis: 'Doctorado UNIVERSIDAD NACIONAL DE COLOMBIA SEDE MEDELLÍN Doctorado En Ingeniería Área Recursos Hidráulicos Enerode1994 - de 2003 Sistema de Apoyo para la Toma de Decisiones en Distritos de Riego y Drenaje a partir de sus Recursos, Restricciones e Impactos Ambientales, para el Caso de Colombia',
        correo: 'alolaya@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000310883',
        orcid: 'https://orcid.org/0000-0002-7080-1394',
      },
      {
        id: '4',
        foto: '/assets/pro_null_h.png',
        nombre: 'Carlos Fernando Narváez Rojas',
        // tslint:disable-next-line:max-line-length
        sintesis: 'Postdoctorado/Estancia postdoctoral MASSACHUSETTS INSTITUTE OF TECHNOLOGY (MIT) DEPARTMENT OF HEALTH AND SCIENCE Febrerode2017 - Mayode 2017',
        correo: 'cfnarvaez@usco.edu.co',
        cvlac: 'https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000310050',
        orcid: 'https://orcid.org/0000-0002-7080-1394',
      },
      {
        id: '5',
        foto: '/assets/pro_null_h.png',
        nombre: 'Carlos Bolívar Bonilla Baquero',
        // tslint:disable-next-line:max-line-length
        sintesis: '',
        correo: 'bolivar.bonilla@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '6',
        foto: '/assets/perfil_eduardo_pastrana.png',
        nombre: 'Eduardo Pastrana Bonilla',
        // tslint:disable-next-line:max-line-length
        sintesis: 'Eduardo Pastrana Bonilla es Ingeniero Agrícola egresado de la Universidad Surcolombiana, con un Master of Science en Ciencia y Tecnología de Alimentos de California State University, Fresno, USA, y Doctorado en Ciencia y Tecnología de Alimentos de University of Georgia, USA. Es profesor titular de Tiempo completo Facultad de Ingeniería de la Universidad Surcolombiana desde el año 1984, ha sido Secretario Académico de la Facultad de Ingeniería, Jefe de Programa de Ingeniería Agrícola, Vicerrector de Recursos y Bienestar, Jefe de Programa, Administración Agroindustrial, Decano Facultad de Ingeniería, en dos periodos, Rector en encargo y en propiedad y, últimamente, Coordinador del Doctorado en Agroindustria y Desarrollo Agrícola Sostenible, todos estos cargos en la Universidad Surcolombiana. Ha sido Coordinador “Reestructuración curricular del programa de Ingeniería Agrícola”. Miembro del Comité Institucional de Acreditación. Universidad Surcolombiana. Coordinador de la Autoevaluación, con fines de acreditación, del programa de Ingeniería Agrícola. Coordinador de currículo de la Facultad de Ingeniería.  Y Par académico CNA, en 18 oportunidades. Ha sido conferencista y participante en más de 100 eventos. Y es miembro de la American Chemistry Society  (ACS), del American Oil Chemistry Society (AOCS) y del Institute of Food Technologists (IFT). Fue Becario Fulbright en dos oportunidades y actualmente participa dentro del Comité Asesor de Programas de la Comisión Fulbright – Colombia. ',
        correo: 'pastrana@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '7',
        foto: '/assets/pro_null_m.png',
        nombre: 'Esperanza Cabrera',
        // tslint:disable-next-line:max-line-length
        sintesis: '',
        correo: 'esperanza.cabrera@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '8',
        foto: '/assets/perfil_german_lopez.png',
        nombre: 'German Alfonso López Daza',
        // tslint:disable-next-line:max-line-length
        sintesis: 'Doctorado - DOCTORADO EN DERECHO - Graduado Maestría - MAESTRIA EN GOBIERNO Y POLITICAS PUBLICAS - Graduado Especialización - ESPECIALIZACION EN DERECHO CONSTITUCIONAL - Graduado Profesional - DERECHO - Graduado Básica secundaria Estudio en el Exterior - JUSTICE CONSTITUTIONNEL - Graduado',
        correo: 'germanlo@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '9',
        foto: '/assets/perfil_gilberto_astaiza.png',
        nombre: 'Gilberto Mauricio Astaiza',
        // tslint:disable-next-line:max-line-length
        sintesis: 'Doctorado - DOCTORADO EN SALUD PUBLICA - Graduado Maestría - MAESTRIA EN EDUCACION Y DESARROLLO COMUNITARIO - Graduado Especialización - ESPECIALIZACION EN EPIDEMIOLOGIA - Graduado Profesional - MEDICINA - Graduado',
        correo: 'gastaiza@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '10',
        foto: '/assets/pro_null_h.png',
        nombre: 'Jairo Antonio Rodríguez Rodríguez',
        // tslint:disable-next-line:max-line-length
        sintesis: 'Doctorado - DOCTORADO EN CIENCIAS BIOMEDICAS - Graduado, Maestría - MAESTRIA EN MICROBIOLOGIA - Graduado, Especialización - ESPECIALIZACION EN ALERGOLOGIA CLINICA - Graduado, Profesional - MEDICINA - Graduado, Básica secundaria, Estudio en el Exterior - ALERGIA E INMUNOLOGIA PEDIATRICA - No Graduado, Estudio en el Exterior - Doctor en Ciencias Biomédicas - Graduado',
        correo: 'jrodriguez@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '11',
        foto: '/assets/perfil_jorge_castaneda.png',
        nombre: 'Jorge Andrés Ramos Castañeda',
        // tslint:disable-next-line:max-line-length
        sintesis: 'Enfermero, Especialista en Epidemiología, Magíster en Epidemiología Clínica y Doctor en Salud Pública. Docente Universidad Surcolombiana, Fundación Universitaria Navarra, y docente invitado de la Universidad CES. Actualmente clasificado como investigador asociado por Minciencias. Experiencia en investigación en salud, revisión sistemática y metaanálisis, seguridad del paciente y Salud Pública. Docente de los cursos de seminario de investigación, determinantes sociales de la salud y revisión sistemática de programas de doctorado, maestría y especialización. Asesor en la parte de investigación de instituciones prestadoras de servicios de salud y empresas farmacéuticas.',
        correo: 'andres.ramos@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '12',
        foto: '/assets/pro_null_h.png',
        nombre: 'José Miguel Cristancho Fierro',
        // tslint:disable-next-line:max-line-length
        sintesis: '',
        correo: 'micrista@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '13',
        foto: '/assets/pro_null_h.png',
        nombre: 'Juan Carlos Acebedo Restrepo',
        // tslint:disable-next-line:max-line-length
        sintesis: '',
        correo: 'juan.acebedo@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '14',
        foto: '/assets/perfil_luis_munoz.png',
        nombre: 'Luis Alfredo Muñoz Velazco',
        // tslint:disable-next-line:max-line-length
        sintesis: 'Par Evaluador Reconocido por Minciencias Categorìa: Investigador Junior (IJ) con vigencia hasta la publicación de los resultados de la siguiente convocatoria    	•	Doctorado Universidad de Manizales Desarrollo Sostenible (2018) Tesis: “Influencia del sector hidroeléctrico en el desarrollo sostenible del territorio huilanse.” •	Maestría/Magister Universidad Externado de Colombia Derecho Economíco (2008)	Especialización Universidad Externado de Colombia Seguridad Social(2005) •	Especialización Escuela de Administracion de Negocios - E.A.N. Administración Financiera (1998)	Especialización Universidad Surcolombiana Gestión del Desarrollo Regional(1995) Especialización Universidad Santo Tomàs Docencia Universitaria(2001)',
        correo: 'luisalfredo.munoz@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '15',
        foto: '/assets/pro_null_h.png',
        nombre: 'Manuel García Flórez',
        // tslint:disable-next-line:max-line-length
        sintesis: '',
        correo: 'garcia@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '16',
        foto: '/assets/pro_null_m.png',
        nombre: 'Mirian Oviedo Córdoba',
        // tslint:disable-next-line:max-line-length
        sintesis: '',
        correo: 'myrovi@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '17',
        foto: '/assets/perfil_nelson_lopez.png',
        nombre: 'Nelson Ernesto López Jiménez',
        // tslint:disable-next-line:max-line-length
        sintesis: '',
        correo: 'nelopez@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '18',
        foto: '/assets/perfil_nelson_gutierrez.png',
        nombre: 'Nelson Gutiérrez Guzmán',
        // tslint:disable-next-line:max-line-length
        sintesis: '',
        correo: 'ngutierrezg@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '19',
        foto: '/assets/perfil_nicolas_nunez.png',
        nombre: 'Nicolás Arturo Núñez Gómez',
        // tslint:disable-next-line:max-line-length
        sintesis: 'Psicólogo Especialista en Psicología Clínica y de la Salud Especialista en Estadística Magister en Filosofía Doctor en Ciencias de la Salud Universidad Surcolombiana Facultad de Salud Programa de Medicina Adscrito al Area de Psiquiatría Profesor Doctorado en Ciencias de la Salud Coordinador Grupo de Investigación Carlos Finlay. Par Académico Dra. Zoraida María Amable Ambros. Escuela Nacional de Salud Pública, La Habana, Cuba. ',
        correo: 'ninugo@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '20',
        foto: '/assets/pro_null_m.png',
        nombre: 'Ofelia Ramírez Losada',
        // tslint:disable-next-line:max-line-length
        sintesis: '',
        correo: 'ofelia.ramirez@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '21',
        foto: '/assets/perfil_leon_reyes.png',
        nombre: 'Pedro León Reyes Gaspar',
        // tslint:disable-next-line:max-line-length
        sintesis: 'Médico Cirujano Doctor en Ciencias de la Salud Especialista en Epidemiología Especialista en Gerencia y Auditoria de la Calidad en Salud Especialista en Gerencia de Servicios de Salud Diplomado en Auditoria Médica Diplomado en Docencia Universitaria Docente Titular Departamento de Salud Pública Universidad Surcolombiana Coordinador de Posgrados Facultad de Salud Universidad Surcolombiana Investigador, Grupo de Investigación Desarrollo Social, Salud Pública y Derechos Humanos, Universidad Surcolombiana, categoría A Colciencias Ex Rector Universidad Surcolombiana Ex Decano Facultad de Salud Universidad Surcolombiana Ex integrante Juntas Directivas ESEs Departamentales del Huila Ex Director Hospital Regional de Pitalito, Huila Ex Coordinador Técnico Hospital Regional de Pitalito, Huila',
        correo: 'pelerey@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '22',
        foto: '/assets/perfil_reinaldo_polo.png',
        nombre: 'Reinaldo Emilio Polo Ledesma',
        // tslint:disable-next-line:max-line-length
        sintesis: '',
        correo: 'remipole@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      {
        id: '23',
        foto: '/assets/perfil_willian_torres.png',
        nombre: 'William Fernando Torres Silva',
        // tslint:disable-next-line:max-line-length
        sintesis: '',
        correo: 'willitor@usco.edu.co',
        cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000830062',
        orcid: 'https://orcid.org/0000-0003-4311-8407',
      },
      );
  }
  verEstudiante( idx: number ) {
    this.router.navigate(['/estudiante', idx]);
  }
  buscarProfesor( termino: string ) {
    // console.log(termino);
    this.router.navigate( ['/buscarEstudiante', termino] );
  }

  up() {
    window.scroll(0, 400);
  }

}
