import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TableComponent } from './table/table.component';
import { TableBookingComponent } from './table-booking/table-booking.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: 'book-table',
    component: TableBookingComponent,
  },
  // other routes within the lazy-loaded module
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
