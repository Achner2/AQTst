import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardComponent } from './Components/dashboard/dashboard.component';



//fusioncharts
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { FusionChartsModule } from 'angular-fusioncharts';


//3d threejs
import { ModalsComponent } from './Components/modals/modals.component';
import { LinearGaugeModule as SyncfusionLinearGaugeModule } from '@syncfusion/ej2-angular-lineargauge';
import { PhSensorComponent } from './Components/linearSensors/ph-sensor/ph-sensor.component';
import { CloroSensorComponent } from './Components/linearSensors/cloro-sensor/cloro-sensor.component';
import { TemperaturaSensorComponent } from './Components/linearSensors/temperatura-sensor/temperatura-sensor.component';
import { TurbidezSensorComponent } from './Components/linearSensors/turbidez-sensor/turbidez-sensor.component';
import { NivelSensorComponent } from './Components/linearSensors/nivel-sensor/nivel-sensor.component';
import { FlujoSensorComponent } from './Components/linearSensors/flujo-sensor/flujo-sensor.component';
import { ColorsSensorComponent } from './Components/linearSensors/colors-sensor/colors-sensor.component';
import { CaudSensorComponent } from './Components/linearSensors/caud-sensor/caud-sensor.component';
import { InformesComponent } from './Components/pages/informes/informes.component';
import { StatusComponent } from './Components/status/status.component';
import { GraphicComponent } from './Components/pages/graphic/graphic.component';
import { DsComponent } from './Components/pages/ds/ds.component';


//new
import { CaudalSensorComponent } from './Components/cylinderSensors/caudal-sensor/caudal-sensor.component';
import { TurbidezGaugeComponent } from './Components/cylinderSensors/turbidez-gauge/turbidez-gauge.component';
import { EquipmentsComponent } from './Components/pages/equipments/equipments.component';
import { NgxParticlesModule } from '@tsparticles/angular';
import { TableAlertsComponent } from './Components/pages/table-alerts/table-alerts.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { NotificationComponent } from './Components/pages/notification/notification.component';
import { LinearChartd3Component } from './Components/cylinderSensors/linear-chartd3/linear-chartd3.component';
import { LinearChartHigchartsComponent } from './Components/pages/linear-chart-higcharts/linear-chart-higcharts.component'




FusionChartsModule.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ModalsComponent,
        PhSensorComponent,
        CloroSensorComponent,
        TemperaturaSensorComponent,
        TurbidezSensorComponent,
        NivelSensorComponent,
        FlujoSensorComponent,
        ColorsSensorComponent,
        CaudSensorComponent,
        InformesComponent,
        StatusComponent,
        GraphicComponent,
        DsComponent,
        CaudalSensorComponent,
        TurbidezGaugeComponent,
        EquipmentsComponent,
        TableAlertsComponent,
        NotificationComponent,
        LinearChartd3Component,
        LinearChartHigchartsComponent,
        
        
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FusionChartsModule,
        BrowserAnimationsModule,
        SweetAlert2Module.forRoot(),
        CommonModule,
        FormsModule,
        HighchartsChartModule,
        SyncfusionLinearGaugeModule,
        NgxParticlesModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,                
        ReactiveFormsModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync()]
})
export class AppModule { }
