import { TestBed } from "@angular/core/testing";
import { FetchService } from "./fetch.service";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire";
import { firebaseConfig } from "../../environments/firebase.config";
import { AngularFireDatabase } from "@angular/fire/database";
import { StoreModule } from "@ngrx/store";
import { selectMatchesReducer } from "../containers/admin-new-matches-section/store/admin-match-selector.reducers";
import { betMatchesReducer } from "../containers/bet-section/store/bet-section.reducers";
import { appReducer } from "../store/app.reducers";
import { of } from "rxjs";

describe("FetchService", () => {
  let fetchService: FetchService; // Add this

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchService, AngularFireDatabase],
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(firebaseConfig),
        StoreModule.forRoot({
          selectMatches: selectMatchesReducer,
          betMatches: betMatchesReducer,
          app: appReducer
        })
      ]
    });

    fetchService = TestBed.get(FetchService); // Add this
  });

  it("should be created", () => {
    // Remove inject()
    expect(fetchService).toBeTruthy();
  });

  describe("getUserId", () => {
    it("should return a user ID", () => {
      const userId = "test";
      let response;
      spyOn(fetchService, "getUserId").and.returnValue(of(userId));

      fetchService.getUserId().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(userId);
    });
  });
});
