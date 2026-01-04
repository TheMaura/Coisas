import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
  StatusBar,
} from 'react-native';
import { router, useFocusEffect, Redirect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Legend } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatedCard } from '@/components/AnimatedCard';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '@/components/GradientButton';
import { getPlayerImageUrl } from '@/utils/imageUtils';

export default function AdminScreen() {
  const { profile, loading: authLoading } = useAuth();
  const [legends, setLegends] = useState<Legend[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Verificar se é admin
  useEffect(() => {
    if (!authLoading && (!profile || !profile.is_admin)) {
      Alert.alert('Acesso Negado', 'Você não tem permissão para acessar esta área.');
      router.replace('/(tabs)/home');
    }
  }, [profile, authLoading]);

  useFocusEffect(
    React.useCallback(() => {
      if (profile?.is_admin) {
        fetchLegends();
      }
    }, [profile])
  );

  const fetchLegends = async () => {
    try {
      const { data, error } = await supabase
        .from('legends')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLegends(data || []);
    } catch (error) {
      console.error('Error fetching legends:', error);
      Alert.alert('Erro', 'Não foi possível carregar as lendas');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchLegends();
  };

  const deleteLegend = (legend: Legend) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir ${legend.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('legends')
                .delete()
                .eq('id', legend.id);

              if (error) throw error;
              fetchLegends();
            } catch (error: any) {
              Alert.alert('Erro', error.message);
            }
          },
        },
      ]
    );
  };

  const renderLegendItem = ({ item, index }: { item: Legend; index: number }) => {
    const imageUrl = item.image_url || getPlayerImageUrl(item.name);
    
    return (
      <AnimatedCard delay={index * 50} style={styles.legendCard}>
        <View style={styles.cardContent}>
          <Image source={{ uri: imageUrl }} style={styles.legendImage} />
          <View style={styles.legendInfo}>
            <Text style={styles.legendName}>{item.name}</Text>
            <Text style={styles.legendDetails}>
              {item.nationality || ''} {item.nationality && item.position ? '•' : ''} {item.position || ''}
            </Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push(`/admin/edit/${item.id}`)}
            >
              <MaterialIcons name="edit" size={24} color={Theme.colors.primaryLight} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => deleteLegend(item)}
            >
              <MaterialIcons name="delete" size={24} color={Theme.colors.error} />
            </TouchableOpacity>
          </View>
        </View>
      </AnimatedCard>
    );
  };

  if (authLoading || loading) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (!profile?.is_admin) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={Theme.colors.gradientDark}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Painel Admin</Text>
        <Text style={styles.headerSubtitle}>Gerenciar Lendas</Text>
      </LinearGradient>

      <View style={styles.actionsContainer}>
        <GradientButton
          title="Nova Lenda"
          onPress={() => router.push('/admin/create')}
          variant="football"
          style={styles.actionButton}
        />
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => router.push('/admin/stories')}
        >
          <MaterialIcons name="article" size={24} color={Theme.colors.text} />
          <Text style={styles.menuButtonText}>Histórias</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => router.push('/admin/media')}
        >
          <MaterialIcons name="photo-library" size={24} color={Theme.colors.text} />
          <Text style={styles.menuButtonText}>Mídias</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => router.push('/admin/users')}
        >
          <MaterialIcons name="people" size={24} color={Theme.colors.text} />
          <Text style={styles.menuButtonText}>Usuários</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={legends}
        renderItem={renderLegendItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="sports-soccer" size={64} color={Theme.colors.textTertiary} />
            <Text style={styles.emptyText}>Nenhuma lenda cadastrada</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.md,
  },
  headerTitle: {
    ...Theme.typography.h1,
    fontSize: 28,
    marginBottom: Theme.spacing.xs,
  },
  headerSubtitle: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
  },
  actionsContainer: {
    padding: Theme.spacing.md,
    paddingTop: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  actionButton: {
    marginBottom: Theme.spacing.sm,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundCard,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    gap: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  menuButtonText: {
    ...Theme.typography.body,
    fontWeight: '600',
    flex: 1,
  },
  listContent: {
    padding: Theme.spacing.md,
  },
  legendCard: {
    marginBottom: Theme.spacing.md,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendImage: {
    width: 80,
    height: 80,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.backgroundLight,
  },
  legendInfo: {
    flex: 1,
    padding: Theme.spacing.md,
  },
  legendName: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  legendDetails: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  actionButton: {
    padding: Theme.spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xxl,
    minHeight: 400,
  },
  emptyText: {
    ...Theme.typography.h3,
    marginTop: Theme.spacing.md,
    color: Theme.colors.textSecondary,
  },
});
