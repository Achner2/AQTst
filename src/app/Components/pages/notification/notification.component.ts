import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableResponseService } from '../../../Services/tableResponse/table-response.service';
import { Router } from '@angular/router';
import { MeasurementResponse, Measurement, MeasurementFilter } from '../../../interfaces/MeasurementResponse';
import { Subscription, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  isPopoverOpen = false;
  alertCount = 0; 
  lastAlertTime: string = '';
  notifications: { icon: string; message: string; time: string, color: string }[] = [];
  private subscription!: Subscription;

  constructor(private tableService: TableResponseService, private router: Router) {}

  ngOnInit() {
    const defaultFilters: MeasurementFilter = {
      serialEquipment: null,
      dateMeasurementComponentStart: null,
      dateMeasurementComponentEnd: null,
      alertCode: null,
      measurementValueStart: null,
      measurementValueEnd: null,
      directionComponent: null,
      channelComponent: null,
      includeAllAlerts: true,
      excludeAlertCode00: true 
    };

    this.subscription = interval(4000)
      .pipe(switchMap(() => this.tableService.getTableHistoryByFilters(0, 10, defaultFilters)))
      .subscribe(response => {
        if (response.success && response.data?.content) {
          this.processAlerts(response.data.content);
        }
      });
  }

  processAlerts(measurements: Measurement[]) {
    const alerts = measurements.filter(m => m.alertName && m.alertName !== 'Normal');
    this.alertCount = alerts.length;
    
    if (alerts.length > 0) {
      const sortedAlerts = [...alerts].sort((a, b) => 
        new Date(b.dateReception).getTime() - new Date(a.dateReception).getTime()
      );
      this.lastAlertTime = new Date(sortedAlerts[0].dateReception).toLocaleTimeString();
    }
    
    this.notifications = alerts.map(m => ({
      icon: m.alertIcon || '⏰',
      message: `Alerta: ${m.variableName} - ${m.alertName} (${m.measurementValue} ${m.variableUnits})`,
      time: new Date(m.dateReception).toLocaleTimeString(),
      color: m.alertColorHex || '#FF0000'
    }));
  }

  togglePopover() {
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  clearNotification(index: number) {
    this.notifications.splice(index, 1);
    this.alertCount = this.notifications.length;
  }

  clearAllNotifications() {
    this.notifications = [];
    this.alertCount = 0;
  }

  navigateToAlertsPage() {
    this.router.navigate(['/alerts']);
    this.isPopoverOpen = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}