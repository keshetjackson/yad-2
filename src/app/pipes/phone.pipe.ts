import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return '';
    }

    // remove any non-digit characters from the input string
    const str = value.toString()
    const cleaned = str.replace(/\D/g, '');

    // check that the cleaned string is 10 digits long
    if (cleaned.length !== 10) {
      return str;
    }

    // format the cleaned string into the desired format
    const part1 = cleaned.slice(0, 3);
    const part2 = cleaned.slice(3, 7);
    const part3 = cleaned.slice(7, 10);

    return `${part1}-${part2}-${part3}`;
  }
}