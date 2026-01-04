import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Story } from '@/types';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { useAuth } from '@/contexts/AuthContext';
import * as Sharing from 'expo-sharing';

export default function StoryDetailScreen() {
  const { id, storyId } = useLocalSearchParams<{ id: string; storyId: string }>();
  const { user } = useAuth();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStory();
    recordView();
  }, [storyId]);

  const fetchStory = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*, legend:legends(name)')
        .eq('id', storyId)
        .single();

      if (error) throw error;
      setStory(data as any);
    } catch (error) {
      console.error('Error fetching story:', error);
    } finally {
      setLoading(false);
    }
  };

  const recordView = async () => {
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

  const handleShare = async () => {
    if (!story) return;
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        const contentPreview = story.content ? story.content.substring(0, 200) + '...' : '';
        await Sharing.shareAsync(story.image_url || '', {
          message: `${story.title}\n\n${contentPreview}`,
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
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

  if (!story) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="light-content" />
        <MaterialIcons name="error-outline" size={64} color={Theme.colors.error} />
        <Text style={styles.errorText}>História não encontrada</Text>
      </View>
    );
  }

  const categoryIcons: { [key: string]: string } = {
    career: 'work',
    achievement: 'emoji-events',
    inspiration: 'lightbulb',
    challenge: 'fitness-center',
    legacy: 'history',
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <MaterialIcons name="share" size={24} color={Theme.colors.text} />
        </TouchableOpacity>
      </View>

      {story.image_url && (
        <Image
          source={{ uri: story.image_url }}
          style={styles.headerImage}
          resizeMode="cover"
        />
      )}

      {story.video_url && (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: story.video_url }}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            useNativeControls
          />
        </View>
      )}

      <View style={styles.content}>
        {story.category && (
          <View style={styles.categoryBadge}>
            <MaterialIcons
              name={categoryIcons[story.category] as any || 'article'}
              size={20}
              color="#fff"
            />
            <Text style={styles.categoryText}>
              {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
            </Text>
          </View>
        )}

        <Text style={styles.title}>{story.title}</Text>

        <Text style={styles.contentText}>{story.content || 'Sem conteúdo disponível'}</Text>

        {story.is_featured && (
          <View style={styles.featuredBadge}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.featuredText}>História em Destaque</Text>
          </View>
        )}
      </View>
    </ScrollView>
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
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.md,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 300,
    backgroundColor: Theme.colors.backgroundLight,
  },
  videoContainer: {
    width: '100%',
    height: 300,
    backgroundColor: Theme.colors.backgroundLight,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: Theme.spacing.md,
    marginTop: Theme.spacing.md,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    marginBottom: Theme.spacing.md,
  },
  categoryText: {
    ...Theme.typography.caption,
    color: '#fff',
    marginLeft: Theme.spacing.xs,
    fontWeight: '600',
  },
  title: {
    ...Theme.typography.h1,
    fontSize: 28,
    marginBottom: Theme.spacing.md,
  },
  contentText: {
    ...Theme.typography.body,
    lineHeight: 26,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.lg,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
  },
  featuredText: {
    ...Theme.typography.caption,
    color: '#FFD700',
    marginLeft: Theme.spacing.xs,
    fontWeight: '600',
  },
  errorText: {
    ...Theme.typography.h3,
    color: Theme.colors.error,
    marginTop: Theme.spacing.md,
  },
});

