import React, { useEffect } from 'react';
import { registerPushToken, setupNotificationListeners } from '@/utils/notifications';
import { router } from 'expo-router';

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Registrar token de notificação quando o app iniciar
    registerPushToken();

    // Configurar listeners de notificações
    const removeListeners = setupNotificationListeners(
      (notification) => {
        console.log('Notification received:', notification);
      },
      (response) => {
        console.log('Notification tapped:', response);
        const data = response.notification.request.content.data;
        // Navegar para a lenda se houver legend_id nos dados
        if (data?.legend_id) {
          router.push(`/legend/${data.legend_id}`);
        }
      }
    );

    return () => {
      removeListeners();
    };
  }, []);

  return <>{children}</>;
}

