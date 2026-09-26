import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonItem, IonLabel, IonIcon, IonAvatar, IonBadge,
  IonItemSliding, IonItemOptions, IonItemOption
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { carSport, createOutline, trashOutline } from 'ionicons/icons';
import { VehiculoI } from '../../models/vehiculo.model';

@Component({
  selector: 'app-vehiculo-card',
  standalone: true,
  templateUrl: './vehiculo-card.component.html',
  styleUrls: ['./vehiculo-card.component.scss'],
  imports: [
    CommonModule, IonItem, IonLabel, IonIcon, IonAvatar, IonBadge,
    IonItemSliding, IonItemOptions, IonItemOption
  ]
})
export class VehiculoCardComponent {
  @Input({ required: true }) vehiculo!: VehiculoI;

  @Output() verHistorial = new EventEmitter<VehiculoI>();
  @Output() editar = new EventEmitter<VehiculoI>();
  @Output() eliminar = new EventEmitter<VehiculoI>();

  constructor() {
    addIcons({ carSport, createOutline, trashOutline });
  }
}
