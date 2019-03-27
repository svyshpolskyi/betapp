import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatNumber"
})
export class FormatNumberPipe implements PipeTransform {
  transform(number): any {
    switch (`${number}`.slice(-1)) {
      case "1":
        return `${number}st`;
      case "2":
        return `${number}nd`;
      case "3":
        return `${number}rd`;
      default:
        return `${number}th`;
    }
  }
}
