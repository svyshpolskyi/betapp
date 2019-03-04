import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/auth.service";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import * as AppActions from "../../store/app.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isAdmin;
  constructor(public auth: AuthService, private store: Store<{}>) {}

  ngOnInit() {
    this.auth.user
      .pipe(
        tap(user => {
          this.isAdmin = user
            ? user.uid === "rp5Esp8PZFPNOj8o4cb3gBNxpeY2"
            : false;
        })
      )
      .subscribe(user => this.store.dispatch(new AppActions.SetUser(user)));
  }
}
