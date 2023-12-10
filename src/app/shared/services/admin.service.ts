import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableEntity } from 'src/app/modules/admin/entities/table-entity';
import { BASE_URL, END_POINT } from 'src/assets/global_urls';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  public getTables(): any {
    return this.httpClient.get(BASE_URL + END_POINT.GET_TABLES);
  }

  public addEditTable(data: TableEntity): any {
    if (data.id) {
      const endpoint = `${BASE_URL + END_POINT.UPDATE_TABLE + data.id}`;
      return this.httpClient.put(endpoint, data);
    } else {
      const endpoint = `${BASE_URL + END_POINT.SAVE_TABLE}`;
      return this.httpClient.post(endpoint, data);
    }
  }

  public deleteTable(tableId: number): any {
    return this.httpClient.delete(
      `${BASE_URL + END_POINT.DELETE_TABLE + tableId}`
    );
  }

  //#region TABLE BOOKING
  public getbookingTables(): any {
    return this.httpClient.get(BASE_URL + END_POINT.GET_TABLE_BOOKING);
  }

  public addEditBookingTable(data: TableEntity): any {
    if (data.id) {
      const endpoint = `${BASE_URL + END_POINT.UPDATE_BOOKING_TABLE + data.id}`;
      return this.httpClient.put(endpoint, data);
    } else {
      const endpoint = `${BASE_URL + END_POINT.SAVE_BOOKING_TABLE}`;
      return this.httpClient.post(endpoint, data);
    }
  }

  public deleteBookingTable(tableId: number): any {
    return this.httpClient.delete(
      `${BASE_URL + END_POINT.DELETE_BOOKING_TABLE + tableId}`
    );
  }
  //#endregion
}
