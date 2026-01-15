import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Media } from '@/types';
import { Theme } from '@/constants/Theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (SCREEN_WIDTH - Theme.spacing.md * 2 - CARD_MARGIN * 2) / 2;

interface MediaGalleryProps {
  media: Media[];
  legendName?: string;
}

export function MediaGallery({ media, legendName }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Separar mídias em destaque e normais
  const featuredMedia = media.filter(m => m.is_featured);
  const regularMedia = media.filter(m => !m.is_featured);

  const openMedia = (item: Media) => {
    setSelectedMedia(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMedia(null);
  };

  const renderFeaturedItem = ({ item, index }: { item: Media; index: number }) => (
    <Animated.View
      entering={FadeIn.delay(index * 100)}
      exiting={FadeOut}
      style={styles.featuredItem}
    >
      <TouchableOpacity
        onPress={() => openMedia(item)}
        style={styles.featuredCard}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: item.thumbnail_url || item.url }}
          style={styles.featuredImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.featuredOverlay}
        >
          <View style={styles.featuredBadge}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.featuredBadgeText}>Destaque</Text>
          </View>
          <Text style={styles.featuredTitle} numberOfLines={2}>
            {item.title || 'Imagem em Destaque'}
          </Text>
          {item.description && (
            <Text style={styles.featuredDescription} numberOfLines={2}>
              {item.description}
            </Text>
          )}
          {item.year && (
            <Text style={styles.featuredYear}>{item.year}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderMediaItem = ({ item, index }: { item: Media; index: number }) => {
    const isLarge = index % 5 === 0; // A cada 5 itens, um card grande
    const cardWidth = isLarge ? SCREEN_WIDTH - Theme.spacing.md * 2 : CARD_WIDTH;
    
    return (
      <Animated.View
        entering={FadeIn.delay(index * 50)}
        exiting={FadeOut}
        style={[
          styles.mediaItem,
          isLarge && styles.mediaItemLarge,
          { width: cardWidth }
        ]}
      >
        <TouchableOpacity
          onPress={() => openMedia(item)}
          style={styles.mediaCard}
          activeOpacity={0.8}
        >
          {item.type === 'image' ? (
            <Image
              source={{ uri: item.thumbnail_url || item.url }}
              style={[styles.mediaThumbnail, isLarge && styles.mediaThumbnailLarge]}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.videoThumbnail, isLarge && styles.videoThumbnailLarge]}>
              <Video
                source={{ uri: item.url }}
                style={styles.videoPreview}
                resizeMode={ResizeMode.COVER}
                shouldPlay={false}
                isMuted
              />
              <View style={styles.playOverlay}>
                <MaterialIcons name="play-circle-filled" size={48} color="#fff" />
              </View>
            </View>
          )}
          <View style={styles.mediaInfo}>
            {item.title && (
              <Text style={styles.mediaTitle} numberOfLines={isLarge ? 2 : 1}>
                {item.title}
              </Text>
            )}
            {item.description && (
              <Text style={styles.mediaDescription} numberOfLines={isLarge ? 3 : 2}>
                {item.description}
              </Text>
            )}
            <View style={styles.mediaFooter}>
              {item.year && (
                <View style={styles.yearBadge}>
                  <MaterialIcons name="calendar-today" size={12} color={Theme.colors.textSecondary} />
                  <Text style={styles.mediaYear}>{item.year}</Text>
                </View>
              )}
              {item.is_featured && (
                <MaterialIcons name="star" size={14} color="#FFD700" />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.gallery}
        showsVerticalScrollIndicator={false}
      >
        {/* Seção de Destaques */}
        {featuredMedia.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="star" size={20} color="#FFD700" />
              <Text style={styles.sectionTitle}>Imagens em Destaque</Text>
            </View>
            <FlatList
              data={featuredMedia}
              renderItem={renderFeaturedItem}
              keyExtractor={(item) => `featured-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
            />
          </View>
        )}

        {/* Galeria Principal */}
        {regularMedia.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="photo-library" size={20} color={Theme.colors.primary} />
              <Text style={styles.sectionTitle}>Galeria Completa</Text>
              <Text style={styles.sectionCount}>({regularMedia.length} {regularMedia.length === 1 ? 'imagem' : 'imagens'})</Text>
            </View>
            <View style={styles.grid}>
              {regularMedia.map((item, index) => (
                <View key={item.id}>
                  {renderMediaItem({ item, index })}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Se não houver mídias */}
        {media.length === 0 && (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="photo-library" size={64} color={Theme.colors.textTertiary} />
            <Text style={styles.emptyText}>Nenhuma mídia disponível</Text>
            <Text style={styles.emptySubtext}>
              As imagens icônicas desta lenda aparecerão aqui quando forem adicionadas
            </Text>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeModal}
          >
            <MaterialIcons name="close" size={32} color="#fff" />
          </TouchableOpacity>

          {selectedMedia && (
            <View style={styles.modalContent}>
              {selectedMedia.type === 'image' ? (
                <Image
                  source={{ uri: selectedMedia.url }}
                  style={styles.fullImage}
                  resizeMode="contain"
                />
              ) : (
                <Video
                  source={{ uri: selectedMedia.url }}
                  style={styles.fullVideo}
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay
                  useNativeControls
                />
              )}
              <View style={styles.modalInfo}>
                {selectedMedia.title && (
                  <Text style={styles.modalTitle}>{selectedMedia.title}</Text>
                )}
                {selectedMedia.description && (
                  <Text style={styles.modalDescription}>
                    {selectedMedia.description}
                  </Text>
                )}
                <View style={styles.modalMeta}>
                  {selectedMedia.year && (
                    <View style={styles.modalMetaItem}>
                      <MaterialIcons name="calendar-today" size={16} color={Theme.colors.textTertiary} />
                      <Text style={styles.modalYear}>{selectedMedia.year}</Text>
                    </View>
                  )}
                  {selectedMedia.source && (
                    <View style={styles.modalMetaItem}>
                      <MaterialIcons name="source" size={16} color={Theme.colors.textTertiary} />
                      <Text style={styles.modalSource}>{selectedMedia.source}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gallery: {
    padding: Theme.spacing.md,
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  sectionTitle: {
    ...Theme.typography.h3,
    fontSize: 20,
    flex: 1,
  },
  sectionCount: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
  },
  featuredList: {
    paddingRight: Theme.spacing.md,
  },
  featuredItem: {
    width: SCREEN_WIDTH * 0.85,
    marginRight: Theme.spacing.md,
  },
  featuredCard: {
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    height: 300,
    ...Theme.shadows.lg,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.colors.backgroundLight,
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Theme.spacing.md,
    paddingTop: Theme.spacing.lg,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    marginBottom: Theme.spacing.sm,
    gap: Theme.spacing.xs,
  },
  featuredBadgeText: {
    ...Theme.typography.caption,
    color: '#FFD700',
    fontWeight: '600',
  },
  featuredTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  featuredDescription: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
    fontSize: 13,
  },
  featuredYear: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mediaItem: {
    marginBottom: Theme.spacing.md,
    width: CARD_WIDTH,
  },
  mediaItemLarge: {
    width: '100%',
    marginBottom: Theme.spacing.md,
  },
  mediaCard: {
    backgroundColor: Theme.colors.backgroundCard,
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  mediaThumbnail: {
    width: '100%',
    height: 220,
    backgroundColor: Theme.colors.backgroundLight,
  },
  mediaThumbnailLarge: {
    height: 300,
  },
  videoThumbnail: {
    width: '100%',
    height: 220,
    backgroundColor: Theme.colors.backgroundLight,
    position: 'relative',
  },
  videoThumbnailLarge: {
    height: 300,
  },
  videoPreview: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  mediaInfo: {
    padding: Theme.spacing.md,
  },
  mediaTitle: {
    ...Theme.typography.body,
    fontWeight: '600',
    marginBottom: Theme.spacing.xs,
  },
  mediaDescription: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
    lineHeight: 18,
  },
  mediaFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yearBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  mediaYear: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
    fontSize: 11,
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
    color: Theme.colors.textTertiary,
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  emptySubtext: {
    ...Theme.typography.body,
    color: Theme.colors.textTertiary,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: Theme.spacing.md,
    zIndex: 10,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
  },
  fullImage: {
    width: SCREEN_WIDTH,
    height: '70%',
  },
  fullVideo: {
    width: SCREEN_WIDTH,
    height: '70%',
  },
  modalInfo: {
    padding: Theme.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.9)',
    maxHeight: '30%',
  },
  modalTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.sm,
  },
  modalDescription: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
    lineHeight: 22,
  },
  modalMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  modalMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  modalYear: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
  },
  modalSource: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
  },
});

