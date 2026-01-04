import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Story } from '@/types';
import { StoryCard } from '@/components/StoryCard';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';

export default function StoriesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [legendName, setLegendName] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: null, label: 'Todas', icon: 'list' },
    { id: 'career', label: 'Carreira', icon: 'work' },
    { id: 'achievement', label: 'Conquistas', icon: 'emoji-events' },
    { id: 'inspiration', label: 'Inspiração', icon: 'lightbulb' },
    { id: 'challenge', label: 'Desafios', icon: 'fitness-center' },
    { id: 'legacy', label: 'Legado', icon: 'history' },
  ];

  useEffect(() => {
    fetchLegendName();
    fetchStories();
  }, [id]);

  const fetchLegendName = async () => {
    try {
      const { data } = await supabase
        .from('legends')
        .select('name')
        .eq('id', id)
        .single();
      if (data) setLegendName(data.name);
    } catch (error) {
      console.error('Error fetching legend name:', error);
    }
  };

  const fetchStories = async () => {
    try {
      let query = supabase
        .from('stories')
        .select('*')
        .eq('legend_id', id)
        .order('created_at', { ascending: false })
        .order('created_at', { ascending: false });

      // Filtro por categoria removido - coluna 'category' não existe no banco
      // if (selectedCategory) {
      //   query = query.eq('category', selectedCategory);
      // }

      const { data, error } = await query;

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchStories();
  };

  const recordView = async (storyId: string) => {
    if (!user) return;
    try {
      await supabase.from('view_stats').insert([
        {
          legend_id: id,
          story_id: storyId,
          user_id: user.id,
          view_type: 'story',
        },
      ]);
    } catch (error) {
      console.error('Error recording view:', error);
    }
  };

  const renderStoryItem = ({ item, index }: { item: Story; index: number }) => (
    <StoryCard
      story={item}
      onPress={() => {
        recordView(item.id);
        router.push(`/legend/${id}/story/${item.id}`);
      }}
      index={index}
    />
  );

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
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={Theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Histórias Inspiradoras</Text>
            <Text style={styles.headerSubtitle}>{legendName}</Text>
          </View>
        </View>

        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id || 'all'}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === item.id && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <MaterialIcons
                name={item.icon as any}
                size={18}
                color={selectedCategory === item.id ? Theme.colors.text : Theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === item.id && styles.categoryChipTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoriesList}
          showsHorizontalScrollIndicator={false}
        />
      </LinearGradient>

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
            <Text style={styles.emptyText}>Nenhuma história encontrada</Text>
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
    paddingBottom: Theme.spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    ...Theme.typography.h2,
    marginBottom: Theme.spacing.xs,
  },
  headerSubtitle: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
  },
  categoriesList: {
    paddingHorizontal: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: Theme.spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: Theme.colors.primary,
  },
  categoryChipText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.xs,
  },
  categoryChipTextActive: {
    color: Theme.colors.text,
    fontWeight: '600',
  },
  listContent: {
    padding: Theme.spacing.md,
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

