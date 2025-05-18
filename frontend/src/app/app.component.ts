import { Component } from '@angular/core';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent],
  template: `<div class="p-4"><app-table /></div>`,
  styles: [],
})
export class AppComponent {}
