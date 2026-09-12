export interface RegistroMantenimiento {
  id?: string;
  vehiculoId: string;
  kilometraje: number;
  fecha: Date;
  tiposMantenimientoIds: string[];
}
