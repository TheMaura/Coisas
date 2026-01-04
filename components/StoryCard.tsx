import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Story } from '@/types';
import { Theme } from '@/constants/Theme';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface StoryCardProps {
  story: Story;
  onPress: () => void;
  index?: number;
}

const categoryIcons: { [key: string]: string } = {
  career: 'work',
  achievement: 'emoji-events',
  inspiration: 'lightbulb',
  challenge: 'fitness-center',
  legacy: 'history',
};

const categoryColors: { [key: string]: string[] } = {
  career: ['#007AFF', '#5AC8FA'],
  achievement: ['#FFD700', '#FFA500'],
  inspiration: ['#34C759', '#69F0AE'],
  challenge: ['#FF3B30', '#FF6B6B'],
  legacy: ['#AF52DE', '#FF2D92'],
};

export function StoryCard({ story, onPress, index = 0 }: StoryCardProps) {
  const category = story.category || 'inspiration';
  const icon = categoryIcons[category] || 'article';
  const gradientColors = categoryColors[category] || Theme.colors.gradientPrimary;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={onPress}
        style={styles.card}
        activeOpacity={0.9}
      >
        {story.image_url ? (
          <Image
            source={{ uri: story.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <LinearGradient
            colors={gradientColors}
            style={styles.gradientPlaceholder}
          >
            <MaterialIcons name={icon} size={48} color="#fff" />
          </LinearGradient>
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.overlay}
        >
          <View style={styles.content}>
            {category && (
              <View style={styles.categoryBadge}>
                <MaterialIcons name={icon} size={16} color="#fff" />
                <Text style={styles.categoryText}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </View>
            )}
            <Text style={styles.title} numberOfLines={2}>
              {story.title}
            </Text>
            <Text style={styles.preview} numberOfLines={2}>
              {story.content ? story.content.substring(0, 100) + '...' : 'Sem descrição disponível'}
            </Text>
            {story.is_featured && (
              <View style={styles.featuredBadge}>
                <MaterialIcons name="star" size={14} color="#FFD700" />
                <Text style={styles.featuredText}>Destaque</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  card: {
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    height: 200,
    ...Theme.shadows.lg,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.colors.backgroundLight,
  },
  gradientPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'flex-end',
  },
  content: {
    padding: Theme.spacing.md,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    marginBottom: Theme.spacing.sm,
  },
  categoryText: {
    ...Theme.typography.caption,
    color: '#fff',
    marginLeft: Theme.spacing.xs,
    fontWeight: '600',
  },
  title: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  preview: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: Theme.spacing.sm,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  featuredText: {
    ...Theme.typography.caption,
    color: '#FFD700',
    marginLeft: Theme.spacing.xs,
    fontWeight: '600',
  },
});

