import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/auth.service";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import * as AppActions from "../../store/app.actions";
import * as BetMatchActions from "../../containers/bet-section/store/bet-section.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isAdmin;
  isLoggedIn;
  constructor(public auth: AuthService, private store: Store<{}>) {}

  ngOnInit() {
    this.auth.user
      .pipe(
        tap(user => {
          this.isAdmin = user
            ? user.uid === "rp5Esp8PZFPNOj8o4cb3gBNxpeY2"
            : false;
          this.isLoggedIn = !!user;
        })
      )
      .subscribe(user => this.store.dispatch(new AppActions.SetUser(user)));
  }

  signOut(): void {
    this.auth.signOut();
    // this.store.dispatch(new BetMatchActions.ResetSelections());
    // this.store.dispatch(new BetMatchActions.LoadBetMatches());
  }
}
