export interface Contenido {
  id: string;
  titulo: string;
  descripcion?: string;
  imagen?: string;
  categoria?: string;
  fecha?: string;
  url?: string;
  activo?: boolean;
  [key: string]: unknown; // Flexibilidad para campos extra de la API
}

export interface ContenidoResponse {
  data: Contenido[];
  total?: number;
  message?: string;
}
