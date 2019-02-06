import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireModule } from "@angular/fire";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AngularFireDatabase } from "angularfire2/database";
import { firebaseConfig } from "../environments/firebase.config";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layouts/header/header.component";
import { FooterComponent } from "./layouts/footer/footer.component";
import { MainComponent } from "./layouts/main/main.component";
import { PersonalComponent } from "./components/personal/personal.component";
import { MatchComponent } from "./components/match/match.component";
import { ScoreSelectorComponent } from "./components/score-selector/score-selector.component";
import { TeamComponent } from "./components/team/team.component";
import { AdminMatchSelectorComponent } from "./components/admin-match-selector/admin-match-selector.component";
import { HomeComponent } from "./layouts/home/home.component";
import { BetSectionComponent } from "./containers/bet-section/bet-section.component";
import { AdminComponent } from "./layouts/admin/admin.component";
import { AdminNewMatchesSectionComponent } from "./containers/admin-new-matches-section/admin-new-matches-section.component";
import { DateButtonsComponent } from "./components/date-buttons/date-buttons.component";

import { FetchService } from "./services/fetch.service";
import { HelpersService } from "./services/helpers.service";
import { BetSectionService } from "./containers/bet-section/bet-section.service";
import { AdminMatchSelectorService } from "./components/admin-match-selector/admin-match-selector.service";

import { FormatDatePipe } from "./pipes/format-date.pipe";
import { FormatRoundPipe } from "./pipes/format-round.pipe";

import { ModalDirective } from "./directives/modal.directive";

import { matchesReducer } from "./components/admin-match-selector/store/admin-match-selector.reducers";
import { environment } from "../environments/environment";
import { AdminSelectedMatchesComponent } from "./components/admin-selected-matches/admin-selected-matches.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    PersonalComponent,
    FooterComponent,
    MatchComponent,
    ScoreSelectorComponent,
    AdminMatchSelectorComponent,
    TeamComponent,
    HomeComponent,
    BetSectionComponent,
    AdminComponent,
    FormatDatePipe,
    FormatRoundPipe,
    AdminNewMatchesSectionComponent,
    ModalDirective,
    DateButtonsComponent,
    AdminSelectedMatchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    StoreModule.forRoot({ matches: matchesReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    FetchService,
    HelpersService,
    BetSectionService,
    AdminMatchSelectorService,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
