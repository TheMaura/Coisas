import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Media } from '@/types';
import { MediaGallery } from '@/components/MediaGallery';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function MediaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [media, setMedia] = useState<Media[]>([]);
  const [legendName, setLegendName] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');

  useEffect(() => {
    fetchLegendName();
    fetchMedia();
  }, [id, filterType]);

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

  const fetchMedia = async () => {
    try {
      let query = supabase
        .from('media')
        .select('*')
        .eq('legend_id', id)
        .order('created_at', { ascending: false })
        .order('created_at', { ascending: false });

      if (filterType !== 'all') {
        query = query.eq('type', filterType);
      }

      const { data, error } = await query;

      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMedia();
  };

  const recordView = async (mediaId: string) => {
    try {
      await supabase.from('view_stats').insert([
        {
          legend_id: id,
          media_id: mediaId,
          view_type: 'media',
        },
      ]);
    } catch (error) {
      console.error('Error recording view:', error);
    }
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
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={Theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Galeria de Mídias</Text>
            <Text style={styles.headerSubtitle}>{legendName}</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {(['all', 'image', 'video'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterChip,
                filterType === type && styles.filterChipActive,
              ]}
              onPress={() => setFilterType(type)}
            >
              <MaterialIcons
                name={
                  type === 'all'
                    ? 'photo-library'
                    : type === 'image'
                    ? 'image'
                    : 'videocam'
                }
                size={18}
                color={filterType === type ? Theme.colors.text : Theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.filterChipText,
                  filterType === type && styles.filterChipTextActive,
                ]}
              >
                {type === 'all' ? 'Todas' : type === 'image' ? 'Imagens' : 'Vídeos'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Theme.colors.primary}
          />
        }
      >
        {media.length > 0 ? (
          <MediaGallery media={media} legendName={legendName} />
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="photo-library" size={64} color={Theme.colors.textTertiary} />
            <Text style={styles.emptyText}>Nenhuma mídia disponível</Text>
            <Text style={styles.emptySubtext}>
              As mídias desta lenda aparecerão aqui quando forem adicionadas
            </Text>
          </View>
        )}
      </ScrollView>
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
  filtersContainer: {
    paddingHorizontal: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: Theme.spacing.sm,
  },
  filterChipActive: {
    backgroundColor: Theme.colors.primary,
  },
  filterChipText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.xs,
  },
  filterChipTextActive: {
    color: Theme.colors.text,
    fontWeight: '600',
  },
  content: {
    flex: 1,
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
    marginBottom: Theme.spacing.sm,
  },
  emptySubtext: {
    ...Theme.typography.body,
    color: Theme.colors.textTertiary,
    textAlign: 'center',
  },
});

