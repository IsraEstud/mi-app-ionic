export interface Seccion {
  id: number;
  name: string;
  url: string;
  internal_name: string;
  to?: string | null;
  parent_id?: number | null;
  padre?: string;           // Nombre del grupo padre, ej: "Introducción"
  contenido?: string;       // HTML renderizable
  youtube?: string;         // URL de YouTube
  icon?: string | null;
  order?: number;
  created_at?: string;
  updated_at?: string;
}
