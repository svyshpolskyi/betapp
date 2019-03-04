import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PersonalComponent } from "./components/personal/personal.component";
import { HomeComponent } from "./layouts/home/home.component";
import { AdminComponent } from "./layouts/admin/admin.component";
import { AdminMatchSelectorComponent } from "./components/admin-match-selector/admin-match-selector.component";
import { AuthGuard } from "./core/auth.guard";

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
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [{ path: ":date", component: AdminMatchSelectorComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
