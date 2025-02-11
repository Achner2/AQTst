import { Component} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-ds',
  templateUrl: './ds.component.html',
  styleUrl: './ds.component.css'
})
export class DsComponent {
 Highcharts: typeof Highcharts = Highcharts;
  isSidebarOpen: boolean = false;

  toggleSidebar() {

    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
