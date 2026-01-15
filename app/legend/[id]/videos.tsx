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
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { YouTubeVideo } from '@/types';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

export default function VideosScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [legendName, setLegendName] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  const categories = [
    { id: null, label: 'Todos', icon: 'video-library' },
    { id: 'highlights', label: 'Melhores Momentos', icon: 'sports-soccer' },
    { id: 'documentary', label: 'Documentários', icon: 'movie' },
    { id: 'interview', label: 'Entrevistas', icon: 'mic' },
    { id: 'goals', label: 'Gols', icon: 'sports-soccer' },
    { id: 'skills', label: 'Jogadas', icon: 'star' },
    { id: 'history', label: 'História', icon: 'history' },
  ];

  useEffect(() => {
    fetchLegendName();
    fetchVideos();
  }, [id, selectedCategory]);

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

  const fetchVideos = async () => {
    try {
      let query = supabase
        .from('youtube_videos')
        .select('*')
        .eq('legend_id', id)
        .order('is_featured', { ascending: false })
        .order('published_at', { ascending: false });

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchVideos();
  };

  const openVideo = (video: YouTubeVideo) => {
    const url = `https://www.youtube.com/watch?v=${video.youtube_id}`;
    Linking.openURL(url).catch((err) => {
      console.error('Error opening video:', err);
    });
  };

  const getYouTubeThumbnail = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const renderVideoItem = ({ item, index }: { item: YouTubeVideo; index: number }) => {
    const thumbnailUrl = item.thumbnail_url || getYouTubeThumbnail(item.youtube_id);
    const categoryInfo = categories.find(c => c.id === item.category);

    return (
      <Animated.View entering={FadeInDown.delay(index * 50)}>
        <TouchableOpacity
          style={[
            styles.videoCard,
            item.is_featured && styles.videoCardFeatured,
          ]}
          onPress={() => openVideo(item)}
        >
          <View style={styles.videoThumbnailContainer}>
            <Image
              source={{ uri: thumbnailUrl }}
              style={styles.videoThumbnail}
              resizeMode="cover"
            />
            <View style={styles.playButton}>
              <MaterialIcons name="play-circle-filled" size={64} color="#fff" />
            </View>
            {item.duration && (
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{formatDuration(item.duration)}</Text>
              </View>
            )}
            {item.is_featured && (
              <View style={styles.featuredBadge}>
                <MaterialIcons name="star" size={16} color="#FFD700" />
                <Text style={styles.featuredText}>Destaque</Text>
              </View>
            )}
          </View>

          <View style={styles.videoContent}>
            <Text style={styles.videoTitle} numberOfLines={2}>
              {item.title}
            </Text>
            {item.description && (
              <Text style={styles.videoDescription} numberOfLines={2}>
                {item.description}
              </Text>
            )}

            <View style={styles.videoFooter}>
              {categoryInfo && (
                <View style={styles.categoryBadge}>
                  <MaterialIcons
                    name={categoryInfo.icon as any}
                    size={16}
                    color={Theme.colors.primary}
                  />
                  <Text style={styles.categoryText}>{categoryInfo.label}</Text>
                </View>
              )}
              {item.view_count > 0 && (
                <View style={styles.viewCountBadge}>
                  <MaterialIcons name="visibility" size={16} color={Theme.colors.textSecondary} />
                  <Text style={styles.viewCountText}>
                    {formatViewCount(item.view_count)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
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

  const featuredVideos = videos.filter(v => v.is_featured);
  const regularVideos = videos.filter(v => !v.is_featured);

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
            <Text style={styles.headerTitle}>Vídeos do YouTube</Text>
            <Text style={styles.headerSubtitle}>{legendName}</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id || 'all'}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <MaterialIcons
                name={category.icon as any}
                size={18}
                color={selectedCategory === category.id ? Theme.colors.text : Theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category.id && styles.categoryChipTextActive,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      <FlatList
        data={videos}
        renderItem={renderVideoItem}
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
            <MaterialIcons name="video-library" size={64} color={Theme.colors.textTertiary} />
            <Text style={styles.emptyText}>Nenhum vídeo encontrado</Text>
            <Text style={styles.emptySubtext}>
              Os vídeos desta lenda aparecerão aqui quando forem adicionados
            </Text>
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
  categoriesContainer: {
    marginBottom: Theme.spacing.sm,
  },
  categoriesContent: {
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
  videoCard: {
    backgroundColor: Theme.colors.backgroundCard,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  videoCardFeatured: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  videoThumbnailContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.colors.backgroundLight,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -32 }, { translateY: -32 }],
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 32,
  },
  durationBadge: {
    position: 'absolute',
    bottom: Theme.spacing.sm,
    right: Theme.spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  durationText: {
    ...Theme.typography.caption,
    color: '#fff',
    fontWeight: '600',
  },
  featuredBadge: {
    position: 'absolute',
    top: Theme.spacing.sm,
    left: Theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
    gap: Theme.spacing.xs,
  },
  featuredText: {
    ...Theme.typography.caption,
    color: '#000',
    fontWeight: '600',
  },
  videoContent: {
    padding: Theme.spacing.md,
  },
  videoTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  videoDescription: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
  },
  videoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundLight,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
    gap: Theme.spacing.xs,
  },
  categoryText: {
    ...Theme.typography.caption,
    fontWeight: '600',
  },
  viewCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  viewCountText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
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

