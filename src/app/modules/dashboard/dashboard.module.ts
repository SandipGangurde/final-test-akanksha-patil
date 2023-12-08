import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { ToastrModule } from "ngx-toastr";
import { HomeComponent } from './home/home.component';
import { EmployeeShiftComponent } from './employee/employee-shift/employee-shift.component';
import { AddEditBookingComponent } from './employee/add-edit-booking/add-edit-booking.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';

@NgModule({
  declarations: [
    HomeComponent,
    EmployeeShiftComponent,
    AddEditBookingComponent,
    ViewEmployeeComponent,
  ],
  imports: [
    DashboardRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    CommonModule,
  ],
  exports: [RouterModule]
})
export class DashboardModule { }