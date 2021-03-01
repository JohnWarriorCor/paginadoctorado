import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroAnio'
})
export class FiltroAnioPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for (const post of value) {
      if (post.fechaEvento.getMonth().indexOf(arg) > -1) {
        resultPosts.push(post);
      }
    }
    return resultPosts;
  }
}
