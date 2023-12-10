import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TableComponent } from './table/table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableBookingComponent } from './table-booking/table-booking.component';
import { AddEditTableComponent } from './modals/add-edit-table/add-edit-table.component';
import { AddEditTableBookingComponent } from './modals/add-edit-table-booking/add-edit-table-booking.component';

const routes: Routes = [{ path: '', component: AdminComponent }];

@NgModule({
  declarations: [AdminComponent, TableComponent, AddEditTableComponent, TableBookingComponent, AddEditTableBookingComponent],
  imports: [
    AdminRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class AdminModule {}
