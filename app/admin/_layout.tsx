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
      {/* Todas as rotas são detectadas automaticamente pelo Expo Router */}
      {/* Não precisamos definir manualmente para evitar conflitos */}
    </Stack>
  );
}

