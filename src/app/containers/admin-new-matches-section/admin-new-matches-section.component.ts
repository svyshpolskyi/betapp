import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-admin-new-matches-section",
  templateUrl: "./admin-new-matches-section.component.html"
})
export class AdminNewMatchesSectionComponent {
  selectedMatches$;
  constructor(private store: Store<{ matches }>) {
    this.selectedMatches$ = this.store.pipe(select("matches"));
  }
}
