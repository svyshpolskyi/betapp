import { Component, OnInit } from "@angular/core";
import { AdminUsersStatusService } from "./admin-users-status.service";

@Component({
  selector: "app-admin-users-status",
  templateUrl: "./admin-users-status.component.html",
  styleUrls: ["./admin-users-status.component.scss"]
})
export class AdminUsersStatusComponent implements OnInit {
  usersStatus$;
  constructor(private adminUsersStatusService: AdminUsersStatusService) {}

  ngOnInit() {
    this.usersStatus$ = this.adminUsersStatusService.getUsersStatus();
  }
}
