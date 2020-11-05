import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private estudiantes: Estudiantes[] = [
    {
      id: 1,
      foto: '/assets/juan.jpg',
      nombre: 'Juan Camilo Calderón Farfán',
      // tslint:disable-next-line:max-line-length
      sintesis: 'Enfermero, Magíster en Salud Pública y Candidato a Doctor en Ciencias de la Salud. Profesor Asistente e Investigador del Departamento de Enfermería de la Universidad Surcolombiana, Líder del Semillero de Investigación en Salud Intercultural. Con experiencia e interés investigativo en la determinación social de la salud, salud intercultural, inequidad en salud de grupos minoritarios y políticas públicas en salud diferenciales.',
      correo: 'juan.calderon@usco.edu.co',
      cvlac: 'https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001436675',
      orcid: '',
    },
    {
      id: 2,
      foto: '/assets/tarin.jpg',
      nombre: 'Tarin Alexandra Lucero Garzon',
      // tslint:disable-next-line:max-line-length
      sintesis: 'Bacterióloga y Laboratorista Clínica, Esp, M. Sc Genética Humana, Universidad Nacional de Colombia, Docente Universidad de la Amazonía, Investigadora Salud pública y ambiental, Genética, Microbiología, Biología y genética Forense. Proyecto de tesis Doctorado: Epidemiología molecular de Tuberculosis Pulmonar en Comunidades Indígenas de áreas de PosAcuerdo en Caquetá, Colombia.',
      correo: 'talucerog@gmail.com',
      cvlac: 'https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001202014',
      orcid: 'https://orcid.org/0000-0003-4311-8407',
    },
    {
      id: 3,
      foto: '/assets/brayant.jpg',
      nombre: 'Brayant Andrade Mendez',
      // tslint:disable-next-line:max-line-length
      sintesis: 'Enfermero Surcolombiano, Especialista en Enfermería en Cuidado Crítico, Magíster en Enfermería y estudiante de doctorado en ciencias de la salud. Profesor Asistente e Investigador del Departamento de Enfermería, Coordinador de la Especialización en Enfermería en Cuidado Crítico de la Universidad Surcolombiana. Con experiencia en investigaciòn y proyecciòn social en los temas de seguridad y cuidado al paciente en estado crítico, cuidado perioperatorio, salud cardiovascular, trasplante de organos  y adherencia al tratamiento en el contexto de atención primaria en salud. ',
      correo: 'brayant.andrade@usco.edu.co',
      cvlac: 'http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001542953',
      orcid: 'https://orcid.org/0000-0001-7165-9361',
    },
    {
      id: 4,
      foto: '/assets/frank.jpg',
      nombre: 'Frank Barreiro Sánchez',
      // tslint:disable-next-line:max-line-length
      sintesis: 'Maestría/Magister UNIVERSIDAD DE CALDAS Maestria en Ciencias Biologicas con Enfasis en Biologia Molecular Agostode2016 - de 2019 Pregrado/Universitario UNIVERSIDAD SURCOLOMBIANA Tecnologia en acuicultura Continental Febrerode2005 - Febrerode 2013 DISTRIBUCIÓN DE LA INFECCIÓN POR Streptococcus iniae EN DIFERENTES ÓRGANOS DE TILAPIA ROJA (Oreochromis sp) Y TILAPIA NILOTICA (Oreochromis niloticus) DIAGNOSTICADO POR PCR EN TIEMPO REAL Pregrado/Universitario CORPORACION UNIVERSITARIA DEL HUILA Medicina Veterinaria y Zootecnia',
      correo: 'frank.barreiro@usco.edu.co',
      cvlac: 'https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001294440 ',
      orcid: '',
    },
];

getEstudiantes(): Estudiantes[] {
  return this.estudiantes;
}

getEstudiante( idx: string ) {
  return this.estudiantes[idx];
}
buscarEstudiante( termino: string ): Estudiantes[] {

  const estudianteArr: Estudiantes[] = [];
  termino = termino.toLowerCase();

  for ( const estudiante of this.estudiantes ) {

    const nombre = estudiante.nombre.toLowerCase();

    if ( nombre.indexOf( termino ) >= 0  ) {
      estudianteArr.push( estudiante );
    }

  }

  return estudianteArr;

}
}
export interface Estudiantes {
id?: number;
foto: string;
nombre: string;
sintesis: string;
correo: string;
cvlac: string;
orcid: string;
}
