import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TableCellUpdate {
  row: number;
  col: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private apiUrl = 'http://localhost:3000/table'; // backend URL

  constructor(private http: HttpClient) {}

  // Fetch full table data
  getTableData(): Observable<TableCellUpdate[]> {
    return this.http.get<TableCellUpdate[]>(this.apiUrl);
  }

  // Update a single cell
  updateCell(data: TableCellUpdate): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(this.apiUrl, data);
  }
}
