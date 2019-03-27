import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TeamComponent } from "./team.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { selectMatchesReducer } from "../../containers/admin-new-matches-section/store/admin-match-selector.reducers";
import { betMatchesReducer } from "../../containers/bet-section/store/bet-section.reducers";
import { appReducer } from "../../store/app.reducers";

describe("TeamComponent", () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          selectMatches: selectMatchesReducer,
          betMatches: betMatchesReducer,
          app: appReducer
        })
      ],
      declarations: [TeamComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
