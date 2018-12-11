import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from "./main/main.component";
import { PersonalComponent } from "./main/personal/personal.component";
import { FooterService } from "./footer/footer.service";
import { MatchComponent } from "./components/match/match.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    PersonalComponent,
    FooterComponent,
    MatchComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [FooterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
