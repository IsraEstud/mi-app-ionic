import { ref } from "vue";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { useToast } from "./useToast";

export const useCamera = () => {
  const { showToast } = useToast();
  const isLoading = ref(false);

  const takePicture = async (): Promise<string | null> => {
    isLoading.value = true;

    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        saveToGallery: false,
      });

      if (image.webPath) {
        const savedPath = await saveImageToLocal(image.webPath);
        return savedPath;
      }

      return null;
    } catch (error: any) {
      if (error?.message?.includes("User cancelled")) {
        return null;
      }
      await showToast("Error al acceder a la cámara", "danger");
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const saveImageToLocal = async (webPath: string): Promise<string> => {
    const response = await fetch(webPath);
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);

    const fileName = `profile_${Date.now()}.jpg`;
    await Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: Directory.Data,
    });

    const result = await Filesystem.getUri({
      path: fileName,
      directory: Directory.Data,
    });

    return result.uri;
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return {
    takePicture,
    isLoading,
  };
};
