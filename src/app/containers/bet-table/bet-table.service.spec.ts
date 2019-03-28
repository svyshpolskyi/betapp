import { TestBed } from "@angular/core/testing";

import { BetTableService } from "./bet-table.service";

describe("BetTableService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: BetTableService = TestBed.get(BetTableService);
    expect(service).toBeTruthy();
  });
});
