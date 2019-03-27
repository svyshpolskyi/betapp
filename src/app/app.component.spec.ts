import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {} from "jasmine";

import { AppComponent } from "./app.component";
import { MainComponent } from "./layouts/main/main.component";
import { FooterComponent } from "./layouts/footer/footer.component";
import { HeaderComponent } from "./layouts/header/header.component";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./layouts/home/home.component";
import { PersonalComponent } from "./components/personal/personal.component";
import { AuthGuard } from "./core/auth.guard";
import { AdminComponent } from "./layouts/admin/admin.component";
import { AdminGuard } from "./core/admin.guard";
import { AdminMatchSelectorComponent } from "./components/admin-match-selector/admin-match-selector.component";
import { APP_BASE_HREF } from "@angular/common";
import { MatchComponent } from "./components/match/match.component";
import { ScoreSelectorComponent } from "./components/score-selector/score-selector.component";
import { TeamComponent } from "./components/team/team.component";
import { BetSectionComponent } from "./containers/bet-section/bet-section.component";
import { FormatDatePipe } from "./pipes/format-date.pipe";
import { FormatRoundPipe } from "./pipes/format-round.pipe";
import { FormatScorePipe } from "./pipes/format-score.pipe";
import { FormatNumberPipe } from "./pipes/format-number.pipe";
import { AdminNewMatchesSectionComponent } from "./containers/admin-new-matches-section/admin-new-matches-section.component";
import { ModalDirective } from "./directives/modal.directive";
import { DateButtonsComponent } from "./components/date-buttons/date-buttons.component";
import { AdminSelectedMatchesComponent } from "./components/admin-selected-matches/admin-selected-matches.component";
import { AdminSetScoreSectionComponent } from "./containers/admin-set-score-section/admin-set-score-section.component";
import { BetResultsSectionComponent } from "./containers/bet-results-section/bet-results-section.component";
import { BetResultsComponent } from "./components/bet-results/bet-results.component";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireModule } from "@angular/fire";
import { firebaseConfig } from "../environments/firebase.config";
import {
  AngularFireDatabase,
  AngularFireDatabaseModule
} from "@angular/fire/database";
import { StoreModule } from "@ngrx/store";
import { selectMatchesReducer } from "./containers/admin-new-matches-section/store/admin-match-selector.reducers";
import { betMatchesReducer } from "./containers/bet-section/store/bet-section.reducers";
import { appReducer } from "./store/app.reducers";
import { FetchService } from "./services/fetch.service";
import { HelpersService } from "./services/helpers.service";
import { BetSectionService } from "./containers/bet-section/bet-section.service";
import { AdminMatchSelectorService } from "./components/admin-match-selector/admin-match-selector.service";
import { AdminSetScoresSectionService } from "./containers/admin-set-score-section/admin-set-score-section.service";
import { BetResultsSectionService } from "./containers/bet-results-section/bet-results-section.service";
import { HttpClientModule } from "@angular/common/http";
import { Core } from "./core/core.module";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const routes: Routes = [
    {
      path: "",
      component: HomeComponent
    },
    {
      path: "personal",
      component: PersonalComponent,
      canActivate: [AuthGuard]
    },
    {
      path: "admin",
      component: AdminComponent,
      canActivate: [AdminGuard],
      children: [{ path: ":date", component: AdminMatchSelectorComponent }]
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        BetResultsComponent
      ],
      imports: [
        RouterModule.forRoot(routes),
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(firebaseConfig),
        StoreModule.forRoot({
          selectMatches: selectMatchesReducer,
          betMatches: betMatchesReducer,
          app: appReducer
        }),
        Core
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: "/" },
        AngularFirestore,
        AngularFireAuth,
        FetchService,
        HelpersService,
        BetSectionService,
        AdminMatchSelectorService,
        AdminSetScoresSectionService,
        BetResultsSectionService,
        AngularFireDatabase,
        AdminGuard,
        AuthGuard
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should have a title", () => {
    expect(component.title).toEqual("betapp");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
