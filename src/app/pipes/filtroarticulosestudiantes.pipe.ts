import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroarticulosestudiantes'
})
export class FiltroarticulosestudiantesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) { return value; }
    const resultPosts = [];
    for (const post of value) {
      if (post.nombreArticulo.toLowerCase().indexOf(arg.toLowerCase()) > -1 || post.autores.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      }
    }
    return resultPosts;
  }

}
