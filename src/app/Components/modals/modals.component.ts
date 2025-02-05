import { string } from '@amcharts/amcharts4/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrl: './modals.component.css'
})
export class ModalsComponent {
  showEquipmentInfo: boolean = false;
  isModalOpen = false;
  lastLecture: string = this.getCurrentTime();

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleEquipmentInfo() {
    this.showEquipmentInfo = !this.showEquipmentInfo;
    console.log("ajjasdjajd")
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleString();
  }
  
}
