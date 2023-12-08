import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/shared/helper/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { EmployeeShiftComponent } from './employee/employee-shift/employee-shift.component';

/* The `dashboardRoutes` constant is an array of route objects. Each route object represents a route in
the application. */
const dashboardRoutes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent,
  children: [
    { path: '', component: HomeComponent, canActivate: [AuthGuard], },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], },
    { path: 'employee-shift', component: EmployeeShiftComponent, canActivate: [AuthGuard], },
    { path: '**', component: HomeComponent, canActivate: [AuthGuard], },
  ], canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }