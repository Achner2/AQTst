import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './Components/register/register.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ForescastCharComponent } from './Components/metrics/forescast-char/forescast-char.component';
import { PieChartComponent } from './Components/metrics/pie-chart/pie-chart.component';
import { StatusComponent } from './Components/metrics/status/status.component';


import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { FusionChartsModule } from 'angular-fusioncharts';
import { PhComponent } from './Components/metrics/ph/ph.component';
import { CylinderComponent } from './Components/metrics/cylinder/cylinder.component';
import { FuelLevelComponent } from './Components/metrics/fuel-level/fuel-level.component';
import { ServerCpuComponent } from './Components/metrics/server-cpu/server-cpu.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ForescastCharComponent,
    PieChartComponent,
    StatusComponent,
    PhComponent,
    CylinderComponent,
    FuelLevelComponent,
    ServerCpuComponent    
    
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FusionChartsModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    RegisterComponent,
    SweetAlert2Module.forRoot(),
    CommonModule,
    FormsModule,
    HighchartsChartModule,
    NgxChartsModule,
    NgApexchartsModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],


})
export class AppModule { }
