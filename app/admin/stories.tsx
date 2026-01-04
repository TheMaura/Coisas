import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
  StatusBar,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Story } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '@/components/GradientButton';
import { AnimatedCard } from '@/components/AnimatedCard';

export default function AdminStoriesScreen() {
  const { profile } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (profile?.is_admin) {
        fetchStories();
      }
    }, [profile])
  );

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*, legends(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
      Alert.alert('Erro', 'Não foi possível carregar as histórias');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchStories();
  };

  const deleteStory = (story: Story) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir "${story.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('stories')
                .delete()
                .eq('id', story.id);

              if (error) throw error;
              fetchStories();
              Alert.alert('Sucesso', 'História excluída com sucesso!');
            } catch (error: any) {
              Alert.alert('Erro', error.message);
            }
          },
        },
      ]
    );
  };

  const toggleStoryStatus = async (story: Story) => {
    try {
      const { error } = await supabase
        .from('stories')
        .update({ is_active: !story.is_active })
        .eq('id', story.id);

      if (error) throw error;
      fetchStories();
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  const renderStoryItem = ({ item, index }: { item: Story; index: number }) => {
    const legendName = (item as any).legends?.name || 'Lenda desconhecida';
    
    return (
      <AnimatedCard delay={index * 50} style={styles.storyCard}>
        <View style={styles.cardContent}>
          <View style={styles.storyInfo}>
            <Text style={styles.storyTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.storyLegend}>Lenda: {legendName}</Text>
            <Text style={styles.storyContent} numberOfLines={2}>
              {item.content}
            </Text>
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusBadge,
                  item.is_active
                    ? styles.statusActive
                    : styles.statusInactive,
                ]}
              >
                <Text style={styles.statusText}>
                  {item.is_active ? 'Ativa' : 'Inativa'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => toggleStoryStatus(item)}
            >
              <MaterialIcons
                name={item.is_active ? 'visibility-off' : 'visibility'}
                size={20}
                color={Theme.colors.textSecondary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => deleteStory(item)}
            >
              <MaterialIcons name="delete" size={20} color={Theme.colors.error} />
            </TouchableOpacity>
          </View>
        </View>
      </AnimatedCard>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={Theme.colors.gradientDark}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestão de Histórias</Text>
        <Text style={styles.headerSubtitle}>
          {stories.length} {stories.length === 1 ? 'história' : 'histórias'}
        </Text>
      </LinearGradient>

      <GradientButton
        title="Nova História"
        onPress={() => router.push('/admin/stories-create')}
        variant="football"
        style={styles.addButton}
      />

      <FlatList
        data={stories}
        renderItem={renderStoryItem}
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
            <MaterialIcons name="article" size={64} color={Theme.colors.textTertiary} />
            <Text style={styles.emptyText}>Nenhuma história cadastrada</Text>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
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
  addButton: {
    margin: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
  },
  listContent: {
    padding: Theme.spacing.md,
  },
  storyCard: {
    marginBottom: Theme.spacing.md,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storyInfo: {
    flex: 1,
  },
  storyTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  storyLegend: {
    ...Theme.typography.caption,
    color: Theme.colors.primaryLight,
    marginBottom: Theme.spacing.xs,
  },
  storyContent: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
  },
  statusContainer: {
    marginTop: Theme.spacing.xs,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  statusActive: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  statusInactive: {
    backgroundColor: 'rgba(158, 158, 158, 0.2)',
  },
  statusText: {
    ...Theme.typography.caption,
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    alignItems: 'flex-start',
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

