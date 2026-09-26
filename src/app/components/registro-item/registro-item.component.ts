import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem, IonLabel, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { buildOutline, trashOutline, calendarOutline } from 'ionicons/icons';
import { RegistroMantenimientoI } from '../../models/registro-mantenimiento.model';

@Component({
  selector: 'app-registro-item',
  standalone: true,
  templateUrl: './registro-item.component.html',
  styleUrls: ['./registro-item.component.scss'],
  imports: [CommonModule, IonItem, IonLabel, IonIcon]
})
export class RegistroItemComponent {
  @Input({ required: true }) registro!: RegistroMantenimientoI;
  @Input() nombresTipos = '';

  @Output() eliminar = new EventEmitter<RegistroMantenimientoI>();

  constructor() {
    addIcons({ buildOutline, trashOutline, calendarOutline });
  }
}
