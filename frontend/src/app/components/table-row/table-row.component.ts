import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCellComponent } from '../table-cell/table-cell.component';

@Component({
  selector: 'app-table-row',
  standalone: true,
  imports: [CommonModule, TableCellComponent],
  template: `
    <div class="grid grid-cols-[60px_repeat(10,1fr)]">
      <div
        class="p-2 border text-center font-medium bg-gray-50 cursor-pointer select-none"
        [class.bg-yellow-200]="highlightedRow"
        (click)="rowClick()"
      >
        {{ rowIndex + 1 }}
      </div>
      <app-table-cell
        *ngFor="let cell of rowData; let colIndex = index"
        [value]="cell"
        [colIndex]="colIndex"
        [isHighlighted]="highlightedCol === colIndex || highlightedRow"
        (valueChange)="onCellChange($event)"
      ></app-table-cell>
    </div>
  `,
  styles: [],
})
export class TableRowComponent {
  @Input() rowData: string[] = [];
  @Input() rowIndex: number = 0;
  @Input() highlightedCol: number | null = null;
  @Input() highlightedRow: boolean = false;
  @Output() update = new EventEmitter<{ colIndex: number; newValue: string }>();
  @Output() rowHeaderClick = new EventEmitter<number>();

  onCellChange(event: { colIndex: number; newValue: string }) {
    this.update.emit(event);
  }

  rowClick() {
    this.rowHeaderClick.emit(this.rowIndex);
  }
}
