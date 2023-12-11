# FinalTestAkankshaPatil

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.











------------------------------------------------------------------------------------------------------------------------------
// role-auth.guard.ts
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RoleAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private toastrService: ToastrService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('access_token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const userRoles = this.authService.getUserRoles();
      const requiredRoles = route.data.roles as string[];

      if (this.checkRoleAuthorization(userRoles, requiredRoles)) {
        return true;
      } else {
        this.toastrService.error('Unauthorized access', 'Error');
        this.router.navigate(['/not-authorized']);
        return false;
      }
    } else {
      this.toastrService.error('Session expired. Please log in again.', 'Error');
      this.authService.logoutUser();
      return false;
    }
  }

  private checkRoleAuthorization(userRoles: string[], requiredRoles: string[]): boolean {
    return requiredRoles.every(role => userRoles.includes(role));
  }
}

------------------------------------------------------------------------------------------------------------------------------
// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { UserComponent } from './user/user.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleAuthGuard } from './auth/role-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleAuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [AuthGuard, RoleAuthGuard],
    data: { roles: ['manager'] }
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard, RoleAuthGuard],
    data: { roles: ['user'] }
  },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


------------------------------------------------------------------------------------------------------------------------------

// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { GuestRegistrationComponent } from './modules/guest-registration/guest-registration.component';
import { RoleAuthGuard } from './auth/role-auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'guest-registration', component: GuestRegistrationComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [RoleAuthGuard], // Add this line for role-based access control
    data: { roles: ['admin'] }, // Specify the required roles
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [RoleAuthGuard], // Add this line for role-based access control
    data: { roles: ['user', 'manager', 'admin'] }, // Specify the required roles
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


