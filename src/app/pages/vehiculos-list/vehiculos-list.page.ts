import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonHeader, 
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem, 
        IonLabel, 
        IonItemSliding, 
        IonItemOptions, 
        IonItemOption,
        IonIcon, 
        IonFab, 
        IonFabButton,
        IonAvatar,
        IonBadge,
        IonButtons,
        IonBackButton,
        AlertController
      } 
from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, createOutline, trashOutline, carSport, carSportOutline } from 'ionicons/icons';
import { VehiculoI } from '../../models/vehiculo.model';
import { VehiculoService } from '../../services/vehiculo.service';

@Component({
  selector: 'app-vehiculos-list',
  templateUrl: './vehiculos-list.page.html',
  styleUrls: ['./vehiculos-list.page.scss'],
  imports: [
        IonHeader, 
        IonToolbar, 
        IonTitle, 
        IonContent, 
        IonList,
        IonItem, 
        IonLabel, 
        IonItemSliding, 
        IonItemOptions, 
        IonItemOption,
        IonIcon, 
        IonFab, 
        IonFabButton,
        IonAvatar,
        IonBadge,
        IonButtons,
        IonBackButton,
        CommonModule, 
        FormsModule
  ]
})
export class VehiculosListPage {

  private alertController = inject(AlertController);
  private vehiculoService = inject(VehiculoService);

  public vehiculoSeleccionado: VehiculoI | null = null;
  public misVehiculos = this.vehiculoService.misVehiculos;

  constructor() {
    addIcons({ add, createOutline, trashOutline, carSport, carSportOutline });
  }

  validarVehiculo(vehiculo: VehiculoI) {
    this.vehiculoSeleccionado = vehiculo;
  }

  async agregarVehiculo() {
    const alert = await this.alertController.create({
      header: 'Nuevo Vehículo',
      inputs: [
        { name: 'placa', type: 'text', placeholder: 'Placa (Ej: ABC123)' },
        { name: 'marca', type: 'text', placeholder: 'Marca (Ej: Mazda)' },
        { name: 'modelo', type: 'text', placeholder: 'Modelo (Ej: 3)' },
        { name: 'anio', type: 'number', placeholder: 'Año (Ej: 2020)' },
        { name: 'kilometrajeActual', type: 'number', placeholder: 'Kilometraje actual' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.placa && data.marca && data.modelo && data.anio && data.kilometrajeActual) {
              this.vehiculoService.agregarVehiculo({
                conductorId: 'demo-conductor',
                placa: data.placa,
                marca: data.marca,
                modelo: data.modelo,
                anio: parseInt(data.anio, 10),
                kilometrajeActual: parseInt(data.kilometrajeActual, 10),
              });
            }
          },
        },
      ],
    });

    await alert.present();
  }

  public async editarVehiculo(vehiculo: VehiculoI): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Editar Vehículo',
      inputs: [
        { name: 'placa', type: 'text', value: vehiculo.placa },
        { name: 'marca', type: 'text', value: vehiculo.marca },
        { name: 'modelo', type: 'text', value: vehiculo.modelo },
        { name: 'anio', type: 'number', value: vehiculo.anio },
        { name: 'kilometrajeActual', type: 'number', value: vehiculo.kilometrajeActual },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Actualizar',
          handler: (data) => {
            if (data.placa && data.marca && data.modelo && data.anio && data.kilometrajeActual) {
              this.vehiculoService.editarVehiculo(vehiculo.id, {
                placa: data.placa,
                marca: data.marca,
                modelo: data.modelo,
                anio: Number(data.anio),
                kilometrajeActual: Number(data.kilometrajeActual),
              });
            }
          },
        },
      ],
    });

    await alert.present();
  }

  public eliminarVehiculo(vehiculo: VehiculoI): void {
    this.vehiculoService.eliminarVehiculo(vehiculo.id);
  }
}