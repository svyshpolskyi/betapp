import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatDate"
})
export class FormatDatePipe implements PipeTransform {
  transform(date): any {
    const formattedDate = new Date(Date.parse(date));
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `${
      days[formattedDate.getDay()]
    }, ${formattedDate.getDate()}/${formattedDate.getMonth() +
      1}, ${formattedDate.getHours()}:${
      formattedDate.getMinutes() > 9
        ? formattedDate.getMinutes()
        : `0${formattedDate.getMinutes()}`
    }`;
  }
}
