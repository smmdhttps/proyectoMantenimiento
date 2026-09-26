
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonIcon,
  IonFab,
  IonFabButton,
  IonButtons,
  IonBackButton,
  IonCheckbox,
  IonItem,
  IonButton,
  IonInput
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, close, buildOutline } from 'ionicons/icons';

import { MantenimientoService } from '../../services/mantenimiento.service';
import { TipoMantenimientoService } from '../../services/tipo-mantenimiento.service';
import { RegistroMantenimientoI } from '../../models/registro-mantenimiento.model';
import { RegistroItemComponent } from '../../components/registro-item/registro-item.component';
import { TIPOS_DEFECTO } from '../../models/tipos-defectos.model';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonList,
    IonIcon, IonFab, IonFabButton, IonButtons, IonBackButton,
    CommonModule, FormsModule, RegistroItemComponent,
    IonCheckbox, IonItem, IonButton, IonInput
  ]
})
export class HistorialPage implements OnInit {
  tiposDefecto = TIPOS_DEFECTO;

  private route = inject(ActivatedRoute);
  private mantenimientoService = inject(MantenimientoService);
  public tipoMantenimientoService = inject(TipoMantenimientoService);

  vehiculoId = '';
  mostrarFormulario = false;
  kilometraje: number | null = null;
  seleccionados: boolean[] = [];

  constructor() {
    addIcons({ add, close, buildOutline });
  }

  ngOnInit() {
    this.vehiculoId = this.route.snapshot.paramMap.get('id') || '';
    this.seleccionados = this.tiposDefecto.map(() => false);
  }

  get historial(): RegistroMantenimientoI[] {
    return this.mantenimientoService.historialPorVehiculo(this.vehiculoId);
  }

  nombresDeTipos(ids: string[]): string {
    if (!Array.isArray(ids)) return '';
    return ids.join(', ');
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  toggleTipo(index: number, checked: boolean) {
    this.seleccionados[index] = checked;
  }

  guardar() {
    const tiposSeleccionados = this.tiposDefecto.filter((_, i) => this.seleccionados[i]);
    if (!this.kilometraje || tiposSeleccionados.length === 0) return;

    this.mantenimientoService.agregarRegistro({
      vehiculoId: this.vehiculoId,
      kilometraje: this.kilometraje,
      fecha: new Date().toISOString(),
      tiposMantenimientoIds: tiposSeleccionados,
    });

    this.cancelar();
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.kilometraje = null;
    this.seleccionados = this.tiposDefecto.map(() => false);
  }

  eliminarRegistro(registro: RegistroMantenimientoI) {
    this.mantenimientoService.eliminarRegistro(registro.id);
  }
}
