import { Component } from '@angular/core';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrl: './equipments.component.css'
})
export class EquipmentsComponent {
  isSidebarOpen: boolean = false;
  isEcommerceOpen = false;


  toggleSidebar() {

    this.isSidebarOpen = !this.isSidebarOpen;
  }


toggleEcommerce() {
  this.isEcommerceOpen = !this.isEcommerceOpen;
}

}
