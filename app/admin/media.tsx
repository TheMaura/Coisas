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
  Image,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Media } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '@/components/GradientButton';
import { AnimatedCard } from '@/components/AnimatedCard';

export default function AdminMediaScreen() {
  const { profile } = useAuth();
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');

  useFocusEffect(
    React.useCallback(() => {
      if (profile?.is_admin) {
        fetchMedia();
      }
    }, [profile, filterType])
  );

  const fetchMedia = async () => {
    try {
      let query = supabase
        .from('media')
        .select('*, legends(name)')
        .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      
      // Filtrar por tipo no cliente (já que a coluna type não existe)
      let filteredData = data || [];
      if (filterType !== 'all') {
        // Tentar identificar tipo pela URL ou extensão
        filteredData = filteredData.filter((item) => {
          const url = item.url?.toLowerCase() || '';
          if (filterType === 'image') {
            return url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('image');
          } else {
            return url.includes('.mp4') || url.includes('.mov') || url.includes('video');
          }
        });
      }
      
      setMedia(filteredData);
    } catch (error) {
      console.error('Error fetching media:', error);
      Alert.alert('Erro', 'Não foi possível carregar as mídias');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMedia();
  };

  const deleteMedia = (mediaItem: Media) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir esta mídia?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('media')
                .delete()
                .eq('id', mediaItem.id);

              if (error) throw error;
              fetchMedia();
              Alert.alert('Sucesso', 'Mídia excluída com sucesso!');
            } catch (error: any) {
              Alert.alert('Erro', error.message);
            }
          },
        },
      ]
    );
  };

  const renderMediaItem = ({ item, index }: { item: Media; index: number }) => {
    const legendName = (item as any).legends?.name || 'Lenda desconhecida';
    const isImage = item.url?.toLowerCase().includes('.jpg') || 
                    item.url?.toLowerCase().includes('.jpeg') || 
                    item.url?.toLowerCase().includes('.png') ||
                    item.url?.toLowerCase().includes('image');
    
    return (
      <AnimatedCard delay={index * 50} style={styles.mediaCard}>
        <View style={styles.cardContent}>
          {isImage && item.url ? (
            <Image source={{ uri: item.url }} style={styles.mediaThumbnail} resizeMode="cover" />
          ) : (
            <View style={styles.mediaThumbnail}>
              <MaterialIcons name="videocam" size={32} color={Theme.colors.textSecondary} />
            </View>
          )}
          <View style={styles.mediaInfo}>
            <Text style={styles.mediaTitle} numberOfLines={1}>
              {item.title || 'Sem título'}
            </Text>
            <Text style={styles.mediaLegend}>Lenda: {legendName}</Text>
            {item.description && (
              <Text style={styles.mediaDescription} numberOfLines={2}>
                {item.description}
              </Text>
            )}
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push(`/admin/edit-media/${item.id}`)}
            >
              <MaterialIcons name="edit" size={24} color={Theme.colors.primary} />
            </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => deleteMedia(item)}
          >
            <MaterialIcons name="delete" size={24} color={Theme.colors.error} />
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
        <Text style={styles.headerTitle}>Gestão de Mídias</Text>
        <Text style={styles.headerSubtitle}>
          {media.length} {media.length === 1 ? 'mídia' : 'mídias'}
        </Text>
      </LinearGradient>

      <GradientButton
        title="Nova Mídia"
        onPress={() => router.push('/admin/add-media')}
        variant="football"
        style={styles.addButton}
      />

      <FlatList
        data={media}
        renderItem={renderMediaItem}
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
            <MaterialIcons name="photo-library" size={64} color={Theme.colors.textTertiary} />
            <Text style={styles.emptyText}>Nenhuma mídia cadastrada</Text>
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
  mediaCard: {
    marginBottom: Theme.spacing.md,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaThumbnail: {
    width: 80,
    height: 80,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  mediaInfo: {
    flex: 1,
  },
  mediaTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  mediaLegend: {
    ...Theme.typography.caption,
    color: Theme.colors.primaryLight,
    marginBottom: Theme.spacing.xs,
  },
  mediaDescription: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: Theme.spacing.xs,
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

