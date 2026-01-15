import { Stack } from 'expo-router';

export default function LegendDetailLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        presentation: 'card',
      }}
    >
      {/* Rotas aninhadas são detectadas automaticamente */}
      {/* index.tsx será a rota padrão para /legend/[id] */}
    </Stack>
  );
}

