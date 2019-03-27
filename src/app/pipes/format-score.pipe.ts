import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatScore"
})
export class FormatScorePipe implements PipeTransform {
  transform(score, match): any {
    return !match.goalsHomeTeam && !match.goalsAwayTeam ? "?" : score;
  }
}
