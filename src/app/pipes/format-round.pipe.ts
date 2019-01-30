import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatRound"
})
export class FormatRoundPipe implements PipeTransform {
  transform(date): any {
    return !isNaN(+date.split(" ").pop())
      ? `Round ${date.split(" ").pop()}`
      : date;
  }
}
