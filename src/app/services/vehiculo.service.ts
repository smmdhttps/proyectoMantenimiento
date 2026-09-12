import { Injectable, inject, signal, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { VehiculoI } from '../models/vehiculo.model';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);
  private vehiculosRef = collection(this.firestore, 'vehiculos');

  public misVehiculos = signal<VehiculoI[]>([]);

  constructor() {
    runInInjectionContext(this.injector, () => {
      collectionData(this.vehiculosRef, { idField: 'id' }).subscribe(
        (vehiculos) => this.misVehiculos.set(vehiculos as VehiculoI[]),
      );
    });
  }

  agregarVehiculo(vehiculo: Omit<VehiculoI, 'id'>) {
    return addDoc(this.vehiculosRef, vehiculo);
  }

  editarVehiculo(id: string, vehiculo: Partial<Omit<VehiculoI, 'id'>>) {
    const vehiculoDoc = doc(this.firestore, `vehiculos/${id}`);
    return updateDoc(vehiculoDoc, vehiculo);
  }

  eliminarVehiculo(id: string) {
    const vehiculoDoc = doc(this.firestore, `vehiculos/${id}`);
    return deleteDoc(vehiculoDoc);
  }
}