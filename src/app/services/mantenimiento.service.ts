import { Injectable, inject, signal, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import {
  Firestore, collection, collectionData, addDoc, updateDoc, deleteDoc, doc,
} from '@angular/fire/firestore';
import { RegistroMantenimientoI } from '../models/registro-mantenimiento.model';
import { VehiculoService } from './vehiculo.service';

@Injectable({ providedIn: 'root' })
export class MantenimientoService {
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);
  private vehiculoService = inject(VehiculoService);
  private registrosRef = collection(this.firestore, 'registrosMantenimiento');

  public misRegistros = signal<RegistroMantenimientoI[]>([]);

  constructor() {
    runInInjectionContext(this.injector, () => {
      collectionData(this.registrosRef, { idField: 'id' }).subscribe((registros) => {
        this.misRegistros.set(registros as RegistroMantenimientoI[]);
      });
    });
  }

  historialPorVehiculo(vehiculoId: string): RegistroMantenimientoI[] {
    return this.misRegistros()
      .filter(r => r.vehiculoId === vehiculoId)
      .sort((a, b) => a.kilometraje - b.kilometraje);
  }

  async agregarRegistro(registro: Omit<RegistroMantenimientoI, 'id'>) {
    await addDoc(this.registrosRef, registro);
    await this.vehiculoService.editarVehiculo(registro.vehiculoId, {
      kilometrajeActual: registro.kilometraje
    });
  }

  editarRegistro(id: string, registro: Partial<Omit<RegistroMantenimientoI, 'id'>>) {
    const ref = doc(this.firestore, `registrosMantenimiento/${id}`);
    return updateDoc(ref, registro);
  }

  eliminarRegistro(id: string) {
    const ref = doc(this.firestore, `registrosMantenimiento/${id}`);
    return deleteDoc(ref);
  }
}
