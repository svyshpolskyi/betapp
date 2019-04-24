import { TestBed } from "@angular/core/testing";

import { AdminUsersStatusService } from "./admin-users-status.service";

describe("AdminUsersStatusService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AdminUsersStatusService = TestBed.get(
      AdminUsersStatusService
    );
    expect(service).toBeTruthy();
  });
});
