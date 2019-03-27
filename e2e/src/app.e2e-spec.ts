import { AppPage } from "./app.po";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should redirect to Admin page when Personal link is clicked", () => {
    const personalPageLink = page.getPersonalButton();
    personalPageLink.click();
    expect(page.getCurrentUrl).toContain("/personal");
  });
});
