import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { InformesComponent } from './Components/pages/informes/informes.component';
import { DsComponent } from './Components/pages/ds/ds.component';
import { EquipmentsComponent } from './Components/pages/equipments/equipments.component';
import { TableAlertsComponent } from './Components/pages/table-alerts/table-alerts.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'informes', component: InformesComponent },
  { path: 'dashboard', component: DashboardComponent},
  {path: 'alerts', component: TableAlertsComponent},
  { path: 'metrics', component: DsComponent },
  {path: 'equipments', component: EquipmentsComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{
}