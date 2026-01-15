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
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { YouTubeVideo, Legend } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '@/components/GradientButton';
import { AnimatedCard } from '@/components/AnimatedCard';

export default function AdminYouTubeVideosScreen() {
  const { profile } = useAuth();
  const [videos, setVideos] = useState<(YouTubeVideo & { legend?: Legend })[]>([]);
  const [legends, setLegends] = useState<Legend[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<YouTubeVideo | null>(null);
  const [selectedLegend, setSelectedLegend] = useState<string>('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtube_id: '',
    category: 'highlights' as YouTubeVideo['category'],
    is_featured: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      if (profile?.is_admin) {
        fetchVideos();
        fetchLegends();
      }
    }, [profile])
  );

  const fetchLegends = async () => {
    try {
      const { data } = await supabase
        .from('legends')
        .select('id, name')
        .eq('is_active', true)
        .order('name');
      setLegends(data || []);
    } catch (error) {
      console.error('Error fetching legends:', error);
    }
  };

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('youtube_videos')
        .select('*, legend:legends(id, name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os vídeos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchVideos();
  };

  const getYouTubeThumbnail = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  const extractYouTubeId = (url: string): string => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : url;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      youtube_id: '',
      category: 'highlights',
      is_featured: false,
    });
    setSelectedLegend('');
    setEditingVideo(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!selectedLegend || !formData.title || !formData.youtube_id) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const youtubeId = extractYouTubeId(formData.youtube_id);
      const videoData = {
        legend_id: selectedLegend,
        title: formData.title,
        description: formData.description || null,
        youtube_id: youtubeId,
        thumbnail_url: getYouTubeThumbnail(youtubeId),
        category: formData.category,
        is_featured: formData.is_featured,
      };

      if (editingVideo) {
        const { error } = await supabase
          .from('youtube_videos')
          .update(videoData)
          .eq('id', editingVideo.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('youtube_videos').insert([videoData]);
        if (error) throw error;
      }

      resetForm();
      fetchVideos();
      Alert.alert('Sucesso', editingVideo ? 'Vídeo atualizado!' : 'Vídeo adicionado!');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleEdit = (video: YouTubeVideo) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || '',
      youtube_id: video.youtube_id,
      category: video.category,
      is_featured: video.is_featured,
    });
    setSelectedLegend(video.legend_id);
    setShowForm(true);
  };

  const handleDelete = (video: YouTubeVideo) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir ${video.title}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('youtube_videos')
                .delete()
                .eq('id', video.id);
              if (error) throw error;
              fetchVideos();
            } catch (error: any) {
              Alert.alert('Erro', error.message);
            }
          },
        },
      ]
    );
  };

  const renderVideoItem = ({ item, index }: { item: YouTubeVideo & { legend?: Legend }; index: number }) => {
    const thumbnailUrl = item.thumbnail_url || getYouTubeThumbnail(item.youtube_id);
    
    return (
      <AnimatedCard delay={index * 50} style={styles.videoCard}>
        <View style={styles.videoContent}>
          <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
            {item.legend && (
              <Text style={styles.legendName}>{item.legend.name}</Text>
            )}
            <Text style={styles.videoCategory}>{item.category}</Text>
            {item.is_featured && (
              <View style={styles.featuredBadge}>
                <MaterialIcons name="star" size={16} color="#FFD700" />
                <Text style={styles.featuredText}>Destaque</Text>
              </View>
            )}
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleEdit(item)}
            >
              <MaterialIcons name="edit" size={20} color={Theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDelete(item)}
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
        <Text style={styles.headerTitle}>Gerenciar Vídeos YouTube</Text>
        <Text style={styles.headerSubtitle}>{videos.length} vídeo{videos.length !== 1 ? 's' : ''}</Text>
      </LinearGradient>

      {!showForm ? (
        <>
          <View style={styles.actionsContainer}>
            <GradientButton
              title="Adicionar Vídeo"
              onPress={() => setShowForm(true)}
              variant="football"
            />
          </View>

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
                <Text style={styles.emptyText}>Nenhum vídeo cadastrado</Text>
              </View>
            }
          />
        </>
      ) : (
        <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent}>
          <Text style={styles.formTitle}>
            {editingVideo ? 'Editar Vídeo' : 'Novo Vídeo'}
          </Text>

          <Text style={styles.label}>Lenda *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.legendSelector}>
            {legends.map((legend) => (
              <TouchableOpacity
                key={legend.id}
                style={[
                  styles.legendChip,
                  selectedLegend === legend.id && styles.legendChipSelected,
                ]}
                onPress={() => setSelectedLegend(legend.id)}
              >
                <Text
                  style={[
                    styles.legendChipText,
                    selectedLegend === legend.id && styles.legendChipTextSelected,
                  ]}
                >
                  {legend.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            placeholder="Ex: Melhores Momentos de Pelé"
          />

          <Text style={styles.label}>ID ou URL do YouTube *</Text>
          <TextInput
            style={styles.input}
            value={formData.youtube_id}
            onChangeText={(text) => setFormData({ ...formData, youtube_id: text })}
            placeholder="Ex: dQw4w9WgXcQ ou https://youtube.com/watch?v=..."
          />
          <Text style={styles.hint}>
            Você pode colar a URL completa ou apenas o ID do vídeo
          </Text>

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Descrição do vídeo"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Categoria</Text>
          <View style={styles.categoryContainer}>
            {(['highlights', 'documentary', 'interview', 'goals', 'skills', 'history'] as YouTubeVideo['category'][]).map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  formData.category === cat && styles.categoryChipSelected,
                ]}
                onPress={() => setFormData({ ...formData, category: cat })}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    formData.category === cat && styles.categoryChipTextSelected,
                  ]}
                >
                  {cat === 'highlights' ? 'Highlights' : 
                   cat === 'documentary' ? 'Documentário' :
                   cat === 'interview' ? 'Entrevista' :
                   cat === 'goals' ? 'Gols' :
                   cat === 'skills' ? 'Jogadas' : 'História'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setFormData({ ...formData, is_featured: !formData.is_featured })}
          >
            <MaterialIcons
              name={formData.is_featured ? 'check-box' : 'check-box-outline-blank'}
              size={24}
              color={formData.is_featured ? Theme.colors.primary : Theme.colors.textSecondary}
            />
            <Text style={styles.checkboxLabel}>Vídeo em Destaque</Text>
          </TouchableOpacity>

          <View style={styles.formActions}>
            <GradientButton
              title={editingVideo ? 'Atualizar' : 'Salvar'}
              onPress={handleSave}
              variant="football"
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={resetForm}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
  actionsContainer: {
    padding: Theme.spacing.md,
  },
  listContent: {
    padding: Theme.spacing.md,
  },
  videoCard: {
    marginBottom: Theme.spacing.md,
  },
  videoContent: {
    flexDirection: 'row',
    padding: Theme.spacing.md,
  },
  thumbnail: {
    width: 120,
    height: 90,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.backgroundLight,
    marginRight: Theme.spacing.md,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  legendName: {
    ...Theme.typography.caption,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  videoCategory: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
    gap: Theme.spacing.xs,
  },
  featuredText: {
    ...Theme.typography.caption,
    color: '#FFD700',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    alignItems: 'center',
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
  formContainer: {
    flex: 1,
  },
  formContent: {
    padding: Theme.spacing.md,
  },
  formTitle: {
    ...Theme.typography.h2,
    marginBottom: Theme.spacing.lg,
  },
  label: {
    ...Theme.typography.body,
    fontWeight: '600',
    marginBottom: Theme.spacing.xs,
    marginTop: Theme.spacing.md,
  },
  input: {
    backgroundColor: Theme.colors.backgroundCard,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    ...Theme.typography.body,
    marginBottom: Theme.spacing.sm,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  hint: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
    fontStyle: 'italic',
  },
  legendSelector: {
    marginBottom: Theme.spacing.md,
  },
  legendChip: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.backgroundCard,
    marginRight: Theme.spacing.sm,
  },
  legendChipSelected: {
    backgroundColor: Theme.colors.primary,
  },
  legendChipText: {
    ...Theme.typography.body,
    color: Theme.colors.text,
  },
  legendChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  categoryChip: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.backgroundCard,
  },
  categoryChipSelected: {
    backgroundColor: Theme.colors.primary,
  },
  categoryChipText: {
    ...Theme.typography.body,
    color: Theme.colors.text,
  },
  categoryChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  checkboxLabel: {
    ...Theme.typography.body,
  },
  formActions: {
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
  },
  cancelButton: {
    padding: Theme.spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    ...Theme.typography.body,
    color: Theme.colors.error,
    fontWeight: '600',
  },
});

