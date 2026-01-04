import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Admin - Lendas' }} />
      <Stack.Screen name="create" options={{ title: 'Nova Lenda' }} />
      <Stack.Screen name="edit/[id]" options={{ title: 'Editar Lenda' }} />
    </Stack>
  );
}

