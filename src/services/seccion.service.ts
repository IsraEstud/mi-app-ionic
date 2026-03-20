import axiosRiksiri from "@/api/axiosConfig";
import type { Seccion } from "@/types/seccion";

export const SeccionService = {
  /**
   * Obtiene una sección por su slug (internal_name).
   * GET /api/contenido/{slug}
   */
  async getBySlug(slug: string): Promise<Seccion> {
    try {
      const response = await axiosRiksiri.get(`contenido/${slug}`);
      // La API responde: { success: true, contenido: { id, name, contenido, youtube, ... } }
      return response.data.contenido ?? response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Error al cargar la sección";
    }
  },

  /**
   * Registra el progreso y avanza a la siguiente sección.
   * POST /api/seteasiguiente
   * Se llama antes de navegar al slug siguiente.
   */
  async seteasiguiente(seccionId: number): Promise<void> {
    try {
      await axiosRiksiri.post("seteasiguiente", { seccion_id: seccionId });
    } catch (error: any) {
      // No bloqueamos la navegación si falla — solo logueamos
      console.warn("[seteasiguiente] Error al registrar progreso:", error?.response?.data?.message ?? error);
    }
  },
};

