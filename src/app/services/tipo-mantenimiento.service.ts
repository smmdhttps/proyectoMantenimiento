import { Injectable, inject, signal, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import {
  Firestore, collection, collectionData, addDoc, getDocs
} from '@angular/fire/firestore';
import { TipoMantenimientoI } from '../models/tipo-mantenimiento.model';
import { TIPOS_DEFECTO } from '../models/tipos-defectos.model';


const tiposDefecto = TIPOS_DEFECTO;

@Injectable({ providedIn: 'root' })
export class TipoMantenimientoService {
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);
  private tiposRef = collection(this.firestore, 'tiposMantenimiento');
  private yaIntentoSembrar = false;

  public misTipos = signal<TipoMantenimientoI[]>([]);

  constructor() {
    runInInjectionContext(this.injector, () => {
      collectionData(this.tiposRef, { idField: 'id' }).subscribe((tipos) => {
        this.misTipos.set(tipos as TipoMantenimientoI[]);
      });
      this.sembrarCatalogoSiVacio();
    });
  }

  private async sembrarCatalogoSiVacio() {
    if (this.yaIntentoSembrar) return;
    this.yaIntentoSembrar = true;

    const snapshot = await getDocs(this.tiposRef);
    const nombresExistentes = snapshot.docs.map(d => d.data()['nombre']);

    for (const nombre of tiposDefecto) {
      if (!nombresExistentes.includes(nombre)) {
        await addDoc(this.tiposRef, { nombre });
      }
    }
  }
}
