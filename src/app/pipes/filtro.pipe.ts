import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {


  transform(value: any, arg: any): any {
    console.log(value);
    const resultPosts = [];
    for (const post of value) {
      if (post.indexOf(arg) > -1) {
        console.log(post);
        resultPosts.push(post);
      }
    }
    return resultPosts;
  }

}
