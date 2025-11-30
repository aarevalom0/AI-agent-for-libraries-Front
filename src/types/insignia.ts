export interface Insignia {
  id: string;               // ObjectId se recibe como string
  nombre: string;
  descripcion: string;
  icono: string;            // URL de la imagen
  criterio_obtencion: string;
  createdAt: string;        // Date se recibe como string ISO
  updatedAt: string;        // Date se recibe como string ISO
}