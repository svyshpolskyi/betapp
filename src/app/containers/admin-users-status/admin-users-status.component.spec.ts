import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminUsersStatusComponent } from "./admin-users-status.component";

describe("AdminUsersStatusComponent", () => {
  let component: AdminUsersStatusComponent;
  let fixture: ComponentFixture<AdminUsersStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsersStatusComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
