export interface RegistroMantenimientoI {
  id: string;
  vehiculoId: string;
  kilometraje: number;
  fecha: string;
  tiposMantenimientoIds: string[];
}
