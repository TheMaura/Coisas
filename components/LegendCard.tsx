import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Legend } from '@/types';
import { Theme } from '@/constants/Theme';
import { MaterialIcons } from '@expo/vector-icons';
import { getPlayerImageUrl } from '@/utils/imageUtils';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface LegendCardProps {
  legend: Legend;
  onPress: () => void;
  delay?: number;
}

export function LegendCard({ legend, onPress, delay = 0 }: LegendCardProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    setTimeout(() => {
      opacity.value = withSpring(1, { damping: 15 });
    }, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const imageUrl = legend.image_url || getPlayerImageUrl(legend.name);

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle]}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <View style={styles.badge}>
          <MaterialIcons name="star" size={16} color="#FFD700" />
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {legend.name}
        </Text>
        {legend.full_name && (
          <Text style={styles.fullName} numberOfLines={1}>
            {legend.full_name}
          </Text>
        )}
        <View style={styles.details}>
          {legend.nationality && (
            <View style={styles.detailItem}>
              <MaterialIcons name="flag" size={14} color={Theme.colors.textSecondary} />
              <Text style={styles.detailText}>{legend.nationality}</Text>
            </View>
          )}
          {legend.position && (
            <View style={styles.detailItem}>
              <MaterialIcons name="sports-soccer" size={14} color={Theme.colors.textSecondary} />
              <Text style={styles.detailText}>{legend.position}</Text>
            </View>
          )}
        </View>
        {legend.current_club && (
          <Text style={styles.club} numberOfLines={1}>
            {legend.current_club}
          </Text>
        )}
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.backgroundCard,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.lg,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.colors.backgroundLight,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  badge: {
    position: 'absolute',
    top: Theme.spacing.md,
    right: Theme.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: Theme.borderRadius.full,
    padding: Theme.spacing.sm,
  },
  content: {
    padding: Theme.spacing.md,
  },
  name: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  fullName: {
    ...Theme.typography.caption,
    marginBottom: Theme.spacing.sm,
    color: Theme.colors.textSecondary,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  detailText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
  club: {
    ...Theme.typography.caption,
    color: Theme.colors.primaryLight,
    fontWeight: '600',
  },
});

