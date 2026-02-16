import { toastController } from "@ionic/vue";

export const useToast = () => {
    const showToast = async (
        message: string,
        color: "success" | "danger" | "warning" | "medium" = "success",
        duration = 3000
    ) => {
        const toast = await toastController.create({
            message,
            duration,
            position: "top", // Best for mobile visibility
            color,
            buttons: [
                {
                    text: "Cerrar",
                    role: "cancel",
                },
            ],
            cssClass: "custom-toast",
        });
        await toast.present();
    };

    return {
        showToast,
    };
};
