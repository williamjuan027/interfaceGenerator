import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  // takes in json object, returns array with properties
  // key = object key
  // value = object value
  transform(value, args: string[]): any {
    const keys = [];
    for (const key of Object.keys(value)) {
      keys.push({ key: key, value: value[key] });
    }
    return keys;
  }
}
