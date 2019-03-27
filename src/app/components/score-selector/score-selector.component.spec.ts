import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ScoreSelectorComponent } from "./score-selector.component";

describe("ScoreSelectorComponent", () => {
  let component: ScoreSelectorComponent;
  let fixture: ComponentFixture<ScoreSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreSelectorComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should trigger the `emit` method when the button is clicked (Jasmine spy)", () => {
    spyOn(component.resultSelected, "emit");
    const button = fixture.nativeElement.querySelector("input");

    button.click();

    expect(component.resultSelected.emit).toHaveBeenCalled();
  });
});
