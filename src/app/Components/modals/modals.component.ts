import { Component } from '@angular/core';
import { LatestMeasurement } from '../../interfaces/measurement';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrl: './modals.component.css'
})
export class ModalsComponent {
  showEquipmentInfo: boolean = false;
  isModalOpen = false;
  lastLecture: string = this.getCurrentTime();
  serialNumber: string = '08000015';
  latestMeasurement: LatestMeasurement | null = null; 

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
