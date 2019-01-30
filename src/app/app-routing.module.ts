import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PersonalComponent } from "./components/personal/personal.component";
import { HomeComponent } from "./layouts/home/home.component";
import { AdminComponent } from "./layouts/admin/admin.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "personal",
    component: PersonalComponent
  },
  {
    path: "admin",
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
