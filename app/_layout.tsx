import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { registerPushToken, setupNotificationListeners } from '@/utils/notifications';
import { router } from 'expo-router';

export default function RootLayout() {
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

  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="legend/[id]" options={{ title: 'Lenda' }} />
        <Stack.Screen name="profile/edit" options={{ title: 'Editar Perfil' }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}

