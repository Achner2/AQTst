import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  localdata: string = "";

  ngOnInit() {
    this.getLocalDate();
  }

  getLocalDate() {
    const now = new Date();
    this.localdata = now.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
  }
}
