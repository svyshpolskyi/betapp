import { TestBed } from "@angular/core/testing";

import { AdminCustomMatchService } from "./admin-custom-match.service";

describe("AdminCustomMatchService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AdminCustomMatchService = TestBed.get(
      AdminCustomMatchService
    );
    expect(service).toBeTruthy();
  });
});
