import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Core } from "./core/core.module";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireModule } from "@angular/fire";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AngularFireDatabase } from "angularfire2/database";
import {
  AngularFireFunctionsModule,
  FunctionsRegionToken
} from "@angular/fire/functions";
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
import { AdminSetScoresSectionService } from "./containers/admin-set-score-section/admin-set-score-section.service";
import { AdminMatchSelectorService } from "./components/admin-match-selector/admin-match-selector.service";
import { BetResultsSectionService } from "./containers/bet-results-section/bet-results-section.service";
import { AngularFireAuth } from "@angular/fire/auth";

import { FormatDatePipe } from "./pipes/format-date.pipe";
import { FormatRoundPipe } from "./pipes/format-round.pipe";
import { FormatScorePipe } from "./pipes/format-score.pipe";
import { FormatNumberPipe } from "./pipes/format-number.pipe";

import { ModalDirective } from "./directives/modal.directive";

import { selectMatchesReducer } from "./containers/admin-new-matches-section/store/admin-match-selector.reducers";
import { environment } from "../environments/environment";
import { AdminSelectedMatchesComponent } from "./components/admin-selected-matches/admin-selected-matches.component";
import { betMatchesReducer } from "./containers/bet-section/store/bet-section.reducers";
import { resultsReducer } from "./containers/admin-set-score-section/store/admin-set-score-section.reducers";
import { appReducer } from "./store/app.reducers";
import { AdminGuard } from "./core/admin.guard";
import { AuthGuard } from "./core/auth.guard";
import { AdminSetScoreSectionComponent } from "./containers/admin-set-score-section/admin-set-score-section.component";
import { BetResultsSectionComponent } from "./containers/bet-results-section/bet-results-section.component";
import { BetResultsComponent } from "./components/bet-results/bet-results.component";
import { BetTableComponent } from "./containers/bet-table/bet-table.component";
import { AdminCustomMatchComponent } from "./components/admin-custom-match/admin-custom-match.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule
} from "@angular/material";
import { DatePipe } from "@angular/common";

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
    FormatScorePipe,
    FormatNumberPipe,
    AdminNewMatchesSectionComponent,
    ModalDirective,
    DateButtonsComponent,
    AdminSelectedMatchesComponent,
    AdminSetScoreSectionComponent,
    BetResultsSectionComponent,
    BetResultsComponent,
    BetTableComponent,
    AdminCustomMatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireFunctionsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    StoreModule.forRoot({
      selectMatches: selectMatchesReducer,
      betMatches: betMatchesReducer,
      app: appReducer,
      results: resultsReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    Core,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [
    FetchService,
    HelpersService,
    BetSectionService,
    AdminMatchSelectorService,
    AdminSetScoresSectionService,
    BetResultsSectionService,
    DatePipe,
    AngularFireDatabase,
    AngularFireAuth,
    AdminGuard,
    AuthGuard,
    { provide: FunctionsRegionToken, useValue: "us-central1" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
