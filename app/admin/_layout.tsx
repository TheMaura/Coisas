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
      <Stack.Screen name="stories-create" options={{ title: 'Nova História' }} />
      <Stack.Screen name="media" options={{ title: 'Gestão de Mídias' }} />
      <Stack.Screen name="media-create" options={{ title: 'Nova Mídia' }} />
      <Stack.Screen name="users" options={{ title: 'Gestão de Usuários' }} />
      <Stack.Screen name="notifications" options={{ title: 'Enviar Notificação' }} />
      <Stack.Screen name="trophies" options={{ title: 'Gestão de Troféus' }} />
      <Stack.Screen name="youtube-videos" options={{ title: 'Gestão de Vídeos YouTube' }} />
      <Stack.Screen name="career-milestones" options={{ title: 'Gestão de Marcos da Carreira' }} />
    </Stack>
  );
}

