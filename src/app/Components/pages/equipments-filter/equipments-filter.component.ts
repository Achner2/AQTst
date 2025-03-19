import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EquipmentService } from '../../../Services/equipmentService/equipment.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { error } from 'jquery';

@Component({
  selector: 'app-equipments-filter',
  templateUrl: './equipments-filter.component.html',
  styleUrl: './equipments-filter.component.css'
})
export class EquipmentsFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<string>();

  serialFilter = new FormControl();
  availableSerials: string[] = [];
  isLoading = false;


  constructor(private readonly equipmentService: EquipmentService ){  }

  ngOnInit(): void {
    this.loadSerials();
    
    this.serialFilter.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filterChange.emit(value || '');
    });
  }


  loadSerials(): void {
    this.isLoading = true;
    this.equipmentService.getAllSerials().subscribe({
      next: (serials) =>{
        this.availableSerials = serials;
        this.isLoading = false;
      },
      error: (error) =>{
        console.error('Error cargando numeros de serie: ', error )
        this.isLoading = false;
      }
    });
  }

  clearFilter(): void {
    this.serialFilter.setValue('');
  } 
}
