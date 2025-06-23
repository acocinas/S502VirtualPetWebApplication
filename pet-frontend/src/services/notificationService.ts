// src/services/notificationService.ts
import { toast } from 'react-toastify';

const notifySuccess = (message: string) => {
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    pauseOnHover: true,
    theme: 'dark',
  });
};

const notifyError = (message: string) => {
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 4000,
    pauseOnHover: true,
    theme: 'dark',
  });
};

const notifyInfo = (message: string) => {
  toast.info(message, {
    position: 'bottom-right',
    autoClose: 3000,
    pauseOnHover: true,
    theme: 'dark',
  });
};

export const notificationService = {
  success: notifySuccess,
  error: notifyError,
  info: notifyInfo,
};
