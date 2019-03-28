import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BetTableComponent } from "./bet-table.component";

describe("BetTableComponent", () => {
  let component: BetTableComponent;
  let fixture: ComponentFixture<BetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BetTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
