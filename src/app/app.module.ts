import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
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
import { StatusComponent } from './Components/metrics/status/status.component';
//fusioncharts
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { FusionChartsModule } from 'angular-fusioncharts';
//3d threejs
import { AqumodelComponent } from './Components/aquModels/aqumodel/aqumodel.component';
import { ModalsComponent } from './Components/modals/modals.component';
import { LinearGaugeModule as SyncfusionLinearGaugeModule } from '@syncfusion/ej2-angular-lineargauge';
//Echarts
import { NgxEchartsModule } from 'ngx-echarts';
//Ignite UI
import { IgxLinearGaugeModule } from "igniteui-angular-gauges";
import { IgxButtonModule } from "igniteui-angular";
import { LinearMeterComponent } from './Components/metrics/linear-meter/linear-meter.component';
import { ChlorineMeterComponent } from './Components/metrics/chlorine-meter/chlorine-meter.component';
import { IgxRadialGaugeModule } from "igniteui-angular-gauges";
import { RadialGaugeComponent } from './Components/metrics/radial-gauge/radial-gauge.component';
import { CylinderChartComponent } from './Components/metrics/cylinder-chart/cylinder-chart.component';
import { ColorSensorComponent } from './Components/metrics/color-sensor/color-sensor.component';
import { CaudalSensorComponent } from './Components/metrics/caudal-sensor/caudal-sensor.component';
import { IgxIconModule, IgxCardModule, IgxRippleModule } from "igniteui-angular";
import { UniversalMeterComponent } from './Components/metrics/universal-meter/universal-meter.component';
import { PhSensorComponent } from './Components/linearSensors/ph-sensor/ph-sensor.component';
import { CloroSensorComponent } from './Components/linearSensors/cloro-sensor/cloro-sensor.component';
import { TemperaturaSensorComponent } from './Components/linearSensors/temperatura-sensor/temperatura-sensor.component';
import { TurbidezSensorComponent } from './Components/linearSensors/turbidez-sensor/turbidez-sensor.component';
import { NivelSensorComponent } from './Components/linearSensors/nivel-sensor/nivel-sensor.component';
import { FlujoSensorComponent } from './Components/linearSensors/flujo-sensor/flujo-sensor.component';
import { ColorsSensorComponent } from './Components/linearSensors/colors-sensor/colors-sensor.component';
import { CaudSensorComponent } from './Components/linearSensors/caud-sensor/caud-sensor.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StatusComponent,
    AqumodelComponent,
    ModalsComponent,
    LinearMeterComponent,
    ChlorineMeterComponent,
    RadialGaugeComponent,
    CylinderChartComponent,
    ColorSensorComponent,
    CaudalSensorComponent,
    UniversalMeterComponent,
    PhSensorComponent,
    CloroSensorComponent,
    TemperaturaSensorComponent,
    TurbidezSensorComponent,
    NivelSensorComponent,
    FlujoSensorComponent,
    ColorsSensorComponent,
    CaudSensorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FusionChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    CommonModule,
    FormsModule,
    HighchartsChartModule,
    NgxChartsModule,
    NgApexchartsModule,
    SyncfusionLinearGaugeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    IgxLinearGaugeModule,
    IgxButtonModule,
    IgxRadialGaugeModule,
    IgxIconModule,
    IgxCardModule,
    IgxRippleModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }