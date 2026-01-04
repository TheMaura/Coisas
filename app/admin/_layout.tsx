import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#fff',
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Admin - Lendas' }} />
      <Stack.Screen name="create" options={{ title: 'Nova Lenda' }} />
      <Stack.Screen name="edit/[id]" options={{ title: 'Editar Lenda' }} />
      <Stack.Screen name="stories" options={{ title: 'Gestão de Histórias' }} />
      <Stack.Screen name="media" options={{ title: 'Gestão de Mídias' }} />
      <Stack.Screen name="users" options={{ title: 'Gestão de Usuários' }} />
      <Stack.Screen name="notifications" options={{ title: 'Enviar Notificação' }} />
    </Stack>
  );
}

