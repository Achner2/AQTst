import { Component} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',

})
export class DashboardComponent{
  Highcharts: typeof Highcharts = Highcharts;
  isSidebarOpen: boolean = false;

  toggleSidebar() {

    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
