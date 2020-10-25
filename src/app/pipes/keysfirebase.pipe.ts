import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysfirebase',
  pure: false
})
export class KeysfirebasePipe implements PipeTransform {

  transform(value: any): any {
    const keys =  [];
    // tslint:disable-next-line:forin
    for (const key in value) {
      keys.push(key);
    }
    return keys;
  }

}
