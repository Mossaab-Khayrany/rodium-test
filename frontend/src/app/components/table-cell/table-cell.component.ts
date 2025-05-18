import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-cell',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="border p-2 text-center cursor-pointer transition-colors duration-200 h-[50px] flex items-center justify-center"
      [class.bg-yellow-200]="isHighlighted"
      (click)="editMode = true"
    >
      <ng-container *ngIf="!editMode; else editTemplate">
        {{ value }}
      </ng-container>

      <ng-template #editTemplate>
        <input
          type="text"
          [(ngModel)]="editableValue"
          (blur)="finishEditing()"
          (keydown.enter)="finishEditing()"
          class="w-full h-full border border-blue-400 px-2 py-1 rounded text-center"
          autofocus
        />
      </ng-template>
    </div>
  `,
  styles: [],
})
export class TableCellComponent {
  @Input() value = '';
  @Input() colIndex = 0;
  @Input() isHighlighted = false;
  @Output() valueChange = new EventEmitter<{
    colIndex: number;
    newValue: string;
  }>();

  editMode = false;
  editableValue = '';

  ngOnChanges() {
    this.editableValue = this.value;
  }

  finishEditing() {
    this.editMode = false;
    this.valueChange.emit({
      colIndex: this.colIndex,
      newValue: this.editableValue,
    });
  }
}
