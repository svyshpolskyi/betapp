import { Component, OnInit } from "@angular/core";
import { FooterService } from "./footer.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  data: any = [];
  logosToShow = ["England", "Germany", "Italy", "Spain", "France"];
  logoUrls;
  constructor(private footerService: FooterService) {}

  ngOnInit() {
    // temporary using local storage to reduce number of requests to server
    if (localStorage.data) {
      this.data = Object.values(JSON.parse(localStorage.getItem("data")));
      this.logoUrls = this.displayLogo(this.logosToShow);
    } else {
      this.footerService.getData().subscribe(dat => {
        this.data = Object.values(dat["api"].leagues);
        this.logoUrls = this.displayLogo(this.logosToShow);
        localStorage.setItem("data", JSON.stringify(this.data));
      });
    }
  }

  // find league logo URL based on country name defined in logosToShow array
  displayLogo(countries) {
    return countries.map(
      league => this.data.find(el => el.country === league).logo
    );
  }
}
