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
      {/* Rotas são detectadas automaticamente pelo Expo Router baseado nos arquivos */}
      {/* Definimos apenas rotas dinâmicas ou com configurações especiais */}
      <Stack.Screen name="edit/[id]" options={{ title: 'Editar Lenda' }} />
    </Stack>
  );
}

