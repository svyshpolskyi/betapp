import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urls } from "../constants/endpoints";

@Injectable()
export class FooterService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = urls.leagues;
  }

  getData() {
    const headersObj = {};
    // creating headers object this way because of Prettier's automatic updating object key to use no quotes
    headersObj["Accept"] = "application/json";
    headersObj["X-Mashape-Key"] =
      "UP2lb9meHZmshbVsGSJ0cwsIJZtgp1CqNEdjsnk4Fc3ggOLKHq";
    const headers = new HttpHeaders(headersObj);

    return this.http.get(this.apiURL, { headers: headers });
  }
}
