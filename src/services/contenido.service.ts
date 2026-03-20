import axiosRiksiri, { axiosRiksiriRoot } from "@/api/axiosConfig";
import type { Contenido } from "@/types/contenido";

export const ContenidoService = {
  /**
   * Obtiene todos los contenidos.
   * Prueba primero: GET https://api.riksiri.com/contenido
   * Si falla con 404, intenta: GET https://api.riksiri.com/api/contenido
   */
  async getAll(): Promise<Contenido[]> {
    let response;
    try {
      // Intento 1: sin prefijo /api/
      response = await axiosRiksiriRoot.get("contenido");
    } catch (rootError: any) {
      if (rootError.response?.status === 404) {
        try {
          // Intento 2: con prefijo /api/
          response = await axiosRiksiri.get("contenido");
        } catch (apiError: any) {
          throw apiError.response?.data?.message || "Error al obtener el contenido";
        }
      } else {
        throw rootError.response?.data?.message || "Error al obtener el contenido";
      }
    }

    const payload = response.data;
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
  },

  /**
   * Obtiene un contenido por su slug.
   * GET /contenido/:slug  — ej: /contenido/que-es-riksiri
   */
  async getBySlug(slug: string): Promise<Contenido> {
    try {
      const response = await axiosRiksiriRoot.get(`contenido/${slug}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Error al obtener el contenido";
    }
  },
};
