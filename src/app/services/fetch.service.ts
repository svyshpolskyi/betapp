import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urls } from "../constants/endpoints";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable, throwError } from "rxjs";
import { from } from "rxjs";

@Injectable()
export class FetchService {
  fixturesURL: string;
  teamsURL: string;
  footerLeaguesURL: string;
  headers: HttpHeaders;

  constructor(private http: HttpClient, private af: AngularFireDatabase) {
    this.fixturesURL = urls.fixtures;
    this.teamsURL = urls.teams;
    this.footerLeaguesURL = urls.leagues;
    this.headers = new HttpHeaders({
      Accept: "application/json",
      "X-Mashape-Key": "UP2lb9meHZmshbVsGSJ0cwsIJZtgp1CqNEdjsnk4Fc3ggOLKHq"
    });
  }

  getFixtures(date) {
    return this.http.get(`${this.fixturesURL}/${date}`, {
      headers: this.headers
    });
  }

  getFooterLogos() {
    return this.http.get(this.footerLeaguesURL, { headers: this.headers });
  }

  getMatchDetails() {
    return this.http.get("assets/db.json");
  }

  makeRequest(url) {
    return this.http.get(url, { headers: this.headers });
  }

  getLogos(leagueId) {
    return this.http.get(`${this.teamsURL}/${leagueId}`, {
      headers: this.headers
    });
  }

  getFBData(url) {
    return this.af.list(url).valueChanges();
  }

  pushFBData(url, data) {
    return from(this.af.list(url).push(data));
  }

  updateFBData(url, round, data) {
    return from(this.af.list(url).update(round, data));
  }
}