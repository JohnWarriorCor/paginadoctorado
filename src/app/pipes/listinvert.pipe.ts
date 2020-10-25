import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listinvert'
})
export class ListinvertPipe implements PipeTransform {

  transform(value) {
    return value.slice().reverse();
  }

}
