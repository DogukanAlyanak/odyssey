import { Toast, ToastActionElement, ToastProps } from '@/components/ui/toast';
import { useToast as useToastOriginal } from '@/components/ui/use-toast';

export const useToast = () => {
  // İç içe useToast hook'u buradan alıyoruz
  const { toast, dismiss } = useToastOriginal();

  // Toast hook'unu geri döndürüyoruz
  return {
    toast,
    dismiss,
  };
};

export type { Toast, ToastProps, ToastActionElement };
