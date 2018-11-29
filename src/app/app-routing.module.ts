import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { PersonalComponent } from "./main/personal/personal.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent
  },
  {
    path: "personal",
    component: PersonalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
