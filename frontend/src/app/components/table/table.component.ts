import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { TableRowComponent } from '../table-row/table-row.component';
import { TableService, TableCellUpdate } from '../../services/table.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableHeaderComponent, TableRowComponent],
  template: `
    <div class="w-[60%] mx-auto mt-10 border rounded shadow overflow-x-auto">
      <div class="min-w-full">
        <app-table-header
          [columns]="columns"
          [highlightedCol]="highlightedCol"
          (columnClick)="onColumnClick($event)"
        ></app-table-header>

        <div *ngFor="let row of tableData; let i = index">
          <app-table-row
            [rowData]="row"
            [rowIndex]="i"
            [highlightedCol]="highlightedCol"
            [highlightedRow]="highlightedRow === i"
            (update)="onCellUpdate(i, $event)"
            (rowHeaderClick)="onRowClick($event)"
          ></app-table-row>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class TableComponent implements OnInit {
  columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  tableData: string[][] = [];
  highlightedCol: number | null = null;
  highlightedRow: number | null = null;

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.tableService.getTableData().subscribe((data: TableCellUpdate[]) => {
      this.tableData = Array.from({ length: 10 }, () =>
        Array(this.columns.length).fill('')
      );

      data.forEach(({ row, col, value }) => {
        const colIndex = this.columns.indexOf(col);
        if (row > 0 && colIndex >= 0 && row <= 10) {
          this.tableData[row - 1][colIndex] = value;
        }
      });
    });
  }

  onCellUpdate(
    rowIndex: number,
    { colIndex, newValue }: { colIndex: number; newValue: string }
  ) {
    const col = this.columns[colIndex];
    this.tableData[rowIndex][colIndex] = newValue;

    this.tableService
      .updateCell({ row: rowIndex + 1, col, value: newValue })
      .subscribe({
        error: () => {
          this.loadTable(); // reload on error
        },
      });
  }

  onRowClick(rowIndex: number) {
    this.highlightedRow = this.highlightedRow === rowIndex ? null : rowIndex;
  }

  onColumnClick(colIndex: number) {
    this.highlightedCol = this.highlightedCol === colIndex ? null : colIndex;
  }
}
