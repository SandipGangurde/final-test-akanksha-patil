import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableBookingEntity } from '../../entities/table-booking-entity';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/services/admin.service';
import { TableEntity } from '../../entities/table-entity';

@Component({
  selector: 'app-add-edit-table-booking',
  templateUrl: './add-edit-table-booking.component.html',
})
export class AddEditTableBookingComponent {
  @Input() table: TableBookingEntity | any;
  @Output() close = new EventEmitter();
  bookingTableForm!: FormGroup;
  public isEdit: boolean = false;
  tableList: TableEntity[] = [];

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getTables();
    if (this.table) {
      this.isEdit = true;
      this.bookingTableForm.reset(this.table);
    }
  }

  private initializeForm() {
    this.bookingTableForm = this.fb.group({
      id: [null],
      tableId: ['', Validators.required],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      status: ['Pending'],
    });
  }

  private getTables(): void {
    this.adminService.getTables().subscribe((response: any) => {
      this.tableList = response;
    });
  }

  save() {
    debugger;
    if (this.bookingTableForm.valid) {
      const saveData = this.bookingTableForm.value as TableBookingEntity;
      console.log(this.bookingTableForm.value);
      this.adminService
        .addEditBookingTable(this.bookingTableForm.value)
        .subscribe((response: any) => {
          console.log('add edit response', response);
          if (saveData?.id) {
            this.toastr.success('Record updated successfully', 'Success');
          } else {
            this.toastr.success('Record save successfully', 'Success');
          }
          this.onClose();
        });
    } else {
      Object.values(this.bookingTableForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  public onClose(): void {
    this.close.emit();
  }
}