import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatRound"
})
export class FormatRoundPipe implements PipeTransform {
  transform(data): any {
    return !isNaN(+data.split(" ").pop())
      ? `Round ${data.split(" ").pop()}`
      : data.split("-").pop();
  }
}
