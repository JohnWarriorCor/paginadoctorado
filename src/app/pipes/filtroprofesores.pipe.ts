import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroprofesores'
})
export class FiltroprofesoresPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) { return value.slice().reverse(); }
    const resultPosts = [];
    for (const post of value) {
      if (post.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        resultPosts.push(post);
      }
    }
    return resultPosts;
  }

}
