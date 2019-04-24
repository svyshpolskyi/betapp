import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urls } from "../constants/endpoints";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable, throwError } from "rxjs";
import { from } from "rxjs";
import { select, Store } from "@ngrx/store";
import { getUserId, getUser } from "../store/app.selectors";
import { AngularFireFunctions } from "@angular/fire/functions";
import { take } from "rxjs/operators";

@Injectable()
export class FetchService {
  fixturesURL: string;
  teamsURL: string;
  tableUrl: string;
  footerLeaguesURL: string;
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private af: AngularFireDatabase,
    private store: Store<{}>,
    private fns: AngularFireFunctions
  ) {
    this.fixturesURL = urls.fixtures;
    this.teamsURL = urls.teams;
    this.tableUrl = urls.table;
    this.footerLeaguesURL = urls.leagues;
    this.headers = new HttpHeaders({
      Accept: "application/json",
      "X-Mashape-Key": "c18fe30c4dmsh5bba5fb8d4ac6d8p13cca2jsn97fb35fed001"
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

  getApiData(url) {
    return this.http.get(url, { headers: this.headers });
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

  getFBLastItem(url) {
    return this.af.list(url, ref => ref.limitToLast(1)).snapshotChanges();
  }

  getFBDataAsObj(url) {
    return this.af.object(url).valueChanges();
  }

  pushFBData(url, data) {
    return from(this.af.list(url).push(data));
  }

  updateFBData(url, key, data) {
    return from(this.af.list(url).set(key, data)).pipe(take(1));
  }

  updateFBData1(url, item, data) {
    return this.af.list(url).update(item, data);
  }

  getUserId() {
    return this.store.select(getUserId);
  }

  getUser() {
    return this.store.select(getUser);
  }
}
