import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="grid grid-cols-[60px_repeat(10,1fr)] bg-gray-200 font-bold text-center cursor-pointer select-none"
    >
      <div class="p-2 border border-gray-300">#</div>
      <div
        *ngFor="let col of columns; let i = index"
        class="p-2 border border-gray-300"
        [class.bg-yellow-200]="highlightedCol === i"
        (click)="colClick(i)"
      >
        {{ col }}
      </div>
    </div>
  `,
  styles: [],
})
export class TableHeaderComponent {
  @Input() columns: string[] = [];
  @Input() highlightedCol: number | null = null;
  @Output() columnClick = new EventEmitter<number>();

  colClick(index: number) {
    this.columnClick.emit(index);
  }
}
