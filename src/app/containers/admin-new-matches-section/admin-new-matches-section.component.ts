import { Component, OnInit } from "@angular/core";
import { leagues } from "../../constants/leagues";
import { FetchService } from "../../services/fetch.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AdminNewMatchesSectionService } from "./admin-new-matches-section.service";

@Component({
  selector: "app-admin-new-matches-section",
  templateUrl: "./admin-new-matches-section.component.html"
})
export class AdminNewMatchesSectionComponent {
  fixtures$;
  roundsQuantity$;
  constructor(
    private adminNewMatchesSectionService: AdminNewMatchesSectionService
  ) {
    this.roundsQuantity$ = this.adminNewMatchesSectionService.getRoundsQuantity();
  }
  onFixtureButtonPressed(date) {
    this.fixtures$ = this.adminNewMatchesSectionService.getFixtures(date);
  }
}
