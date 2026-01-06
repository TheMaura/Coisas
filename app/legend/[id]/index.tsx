import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
  Linking,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Legend } from '@/types';
import { ShareMenu } from '@/components/ShareMenu';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { getPlayerImageUrl } from '@/utils/imageUtils';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export default function LegendDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const [legend, setLegend] = useState<Legend | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const scale = useSharedValue(1);

  useEffect(() => {
    fetchLegend();
    if (user) {
      checkFavorite();
    }
  }, [id, user]);

  const fetchLegend = async () => {
    try {
      const { data, error } = await supabase
        .from('legends')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      setLegend(data);
    } catch (error) {
      console.error('Error fetching legend:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lenda');
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('legend_id', id)
        .single();

      setIsFavorite(!!data && !error);
    } catch (error) {
      setIsFavorite(false);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      Alert.alert('Login necessário', 'Faça login para favoritar lendas');
      return;
    }

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('legend_id', id);

        if (error) throw error;
        setIsFavorite(false);
      } else {
        const { error } = await supabase.from('favorites').insert([
          {
            user_id: user.id,
            legend_id: id,
          },
        ]);

        if (error) throw error;
        setIsFavorite(true);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar favoritos');
    }
  };

  const handleShare = () => {
    if (!legend) return;
    setShowShareMenu(true);
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (!legend) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="light-content" />
        <MaterialIcons name="error-outline" size={64} color={Theme.colors.error} />
        <Text style={styles.errorText}>Lenda não encontrada</Text>
      </View>
    );
  }

  const imageUrl = legend.image_url || getPlayerImageUrl(legend.name);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.headerImage} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', Theme.colors.background]}
          style={styles.imageGradient}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color={Theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.name}>{legend.name}</Text>
            {legend.full_name && (
              <Text style={styles.fullName}>{legend.full_name}</Text>
            )}
          </View>
          <View style={styles.actionButtons}>
            <Animated.View style={animatedButtonStyle}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={toggleFavorite}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
              >
                <MaterialIcons
                  name={isFavorite ? 'favorite' : 'favorite-border'}
                  size={28}
                  color={isFavorite ? Theme.colors.error : Theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={animatedButtonStyle}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleShare}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
              >
                <MaterialIcons name="share" size={28} color={Theme.colors.textSecondary} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        <View style={styles.infoSection}>
          {legend.nationality && (
            <View style={styles.infoCard}>
              <MaterialIcons name="flag" size={24} color={Theme.colors.primaryLight} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Nacionalidade</Text>
                <Text style={styles.infoText}>{legend.nationality}</Text>
              </View>
            </View>
          )}
          {legend.position && (
            <View style={styles.infoCard}>
              <MaterialIcons name="sports-soccer" size={24} color={Theme.colors.footballLight} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Posição</Text>
                <Text style={styles.infoText}>{legend.position}</Text>
              </View>
            </View>
          )}
          {legend.current_club && (
            <View style={styles.infoCard}>
              <MaterialIcons name="groups" size={24} color={Theme.colors.primaryLight} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Clube Atual</Text>
                <Text style={styles.infoText}>{legend.current_club}</Text>
              </View>
            </View>
          )}
          {legend.birth_date && (
            <View style={styles.infoCard}>
              <MaterialIcons name="cake" size={24} color={Theme.colors.primaryLight} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Data de Nascimento</Text>
                <Text style={styles.infoText}>
                  {new Date(legend.birth_date).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            </View>
          )}
        </View>

        {legend.biography && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Biografia</Text>
            <Text style={styles.biography}>{legend.biography}</Text>
          </View>
        )}

        {legend.achievements && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conquistas</Text>
            {legend.achievements.split('\n').filter(a => a.trim()).map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <MaterialIcons name="star" size={20} color="#FFD700" />
                <Text style={styles.achievementText}>{achievement.trim()}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push(`/legend/${id}/stories`)}
          >
            <LinearGradient
              colors={Theme.colors.gradientPrimary}
              style={styles.actionCardGradient}
            >
              <MaterialIcons name="article" size={32} color="#fff" />
              <Text style={styles.actionCardTitle}>Histórias Inspiradoras</Text>
              <Text style={styles.actionCardSubtitle}>Descubra a trajetória</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push(`/legend/${id}/media`)}
          >
            <LinearGradient
              colors={Theme.colors.gradientFootball}
              style={styles.actionCardGradient}
            >
              <MaterialIcons name="photo-library" size={32} color="#fff" />
              <Text style={styles.actionCardTitle}>Galeria de Mídias</Text>
              <Text style={styles.actionCardSubtitle}>Imagens e vídeos</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push(`/legend/${id}/trophies`)}
          >
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.actionCardGradient}
            >
              <MaterialIcons name="emoji-events" size={32} color="#fff" />
              <Text style={styles.actionCardTitle}>Troféus</Text>
              <Text style={styles.actionCardSubtitle}>Conquistas e prêmios</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push(`/legend/${id}/history`)}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.actionCardGradient}
            >
              <MaterialIcons name="timeline" size={32} color="#fff" />
              <Text style={styles.actionCardTitle}>Histórico Completo</Text>
              <Text style={styles.actionCardSubtitle}>Marcos da carreira</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push(`/legend/${id}/videos`)}
          >
            <LinearGradient
              colors={['#FF0000', '#CC0000']}
              style={styles.actionCardGradient}
            >
              <MaterialIcons name="video-library" size={32} color="#fff" />
              <Text style={styles.actionCardTitle}>Vídeos do YouTube</Text>
              <Text style={styles.actionCardSubtitle}>Highlights e documentários</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      
      <ShareMenu
        visible={showShareMenu}
        onClose={() => setShowShareMenu(false)}
        content={{
          title: legend.name,
          text: legend.biography?.substring(0, 200) || '',
          url: `https://futebol-legends.app/legend/${legend.id}`,
          image: legend.image_url,
        }}
      />
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
  imageContainer: {
    width: '100%',
    height: 400,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.colors.backgroundLight,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: Theme.spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: Theme.spacing.md,
    marginTop: -Theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.lg,
  },
  titleSection: {
    flex: 1,
  },
  name: {
    ...Theme.typography.h1,
    fontSize: 32,
    marginBottom: Theme.spacing.xs,
  },
  fullName: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.colors.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.md,
  },
  infoSection: {
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.backgroundCard,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  infoContent: {
    marginLeft: Theme.spacing.md,
    flex: 1,
  },
  infoLabel: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
    marginBottom: Theme.spacing.xs,
  },
  infoText: {
    ...Theme.typography.body,
    fontWeight: '600',
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.md,
  },
  biography: {
    ...Theme.typography.body,
    lineHeight: 24,
    color: Theme.colors.textSecondary,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
    backgroundColor: Theme.colors.backgroundCard,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  achievementText: {
    ...Theme.typography.body,
    marginLeft: Theme.spacing.sm,
    flex: 1,
  },
  errorText: {
    ...Theme.typography.h3,
    color: Theme.colors.error,
    marginTop: Theme.spacing.md,
  },
  actionsSection: {
    marginTop: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  actionCard: {
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    ...Theme.shadows.lg,
  },
  actionCardGradient: {
    padding: Theme.spacing.lg,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  actionCardTitle: {
    ...Theme.typography.h3,
    color: '#fff',
    marginTop: Theme.spacing.sm,
    textAlign: 'center',
  },
  actionCardSubtitle: {
    ...Theme.typography.body,
    color: 'rgba(255,255,255,0.8)',
    marginTop: Theme.spacing.xs,
    textAlign: 'center',
  },
});

