import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminCustomMatchComponent } from "./admin-custom-match.component";

describe("AdminCustomMatchComponent", () => {
  let component: AdminCustomMatchComponent;
  let fixture: ComponentFixture<AdminCustomMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCustomMatchComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
