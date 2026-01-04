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
} from 'react-native';
import { Media } from '@/types';
import { Theme } from '@/constants/Theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface MediaGalleryProps {
  media: Media[];
  legendName?: string;
}

export function MediaGallery({ media, legendName }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openMedia = (item: Media) => {
    setSelectedMedia(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMedia(null);
  };

  const renderMediaItem = ({ item, index }: { item: Media; index: number }) => (
    <Animated.View
      entering={FadeIn.delay(index * 50)}
      exiting={FadeOut}
      style={styles.mediaItem}
    >
      <TouchableOpacity
        onPress={() => openMedia(item)}
        style={styles.mediaCard}
        activeOpacity={0.8}
      >
        {item.type === 'image' ? (
          <Image
            source={{ uri: item.thumbnail_url || item.url }}
            style={styles.mediaThumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.videoThumbnail}>
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
        {item.title && (
          <View style={styles.mediaInfo}>
            <Text style={styles.mediaTitle} numberOfLines={1}>
              {item.title}
            </Text>
            {item.year && (
              <Text style={styles.mediaYear}>{item.year}</Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <>
      <FlatList
        data={media}
        renderItem={renderMediaItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gallery}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="photo-library" size={64} color={Theme.colors.textTertiary} />
            <Text style={styles.emptyText}>Nenhuma mídia disponível</Text>
          </View>
        }
      />

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
              {selectedMedia.title && (
                <View style={styles.modalInfo}>
                  <Text style={styles.modalTitle}>{selectedMedia.title}</Text>
                  {selectedMedia.description && (
                    <Text style={styles.modalDescription}>
                      {selectedMedia.description}
                    </Text>
                  )}
                  {selectedMedia.year && (
                    <Text style={styles.modalYear}>Ano: {selectedMedia.year}</Text>
                  )}
                  {selectedMedia.source && (
                    <Text style={styles.modalSource}>Fonte: {selectedMedia.source}</Text>
                  )}
                </View>
              )}
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  gallery: {
    padding: Theme.spacing.md,
  },
  mediaItem: {
    flex: 1,
    margin: Theme.spacing.sm,
    maxWidth: (SCREEN_WIDTH - Theme.spacing.md * 2 - Theme.spacing.sm * 4) / 2,
  },
  mediaCard: {
    backgroundColor: Theme.colors.backgroundCard,
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  mediaThumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: Theme.colors.backgroundLight,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: Theme.colors.backgroundLight,
    position: 'relative',
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
    padding: Theme.spacing.sm,
  },
  mediaTitle: {
    ...Theme.typography.body,
    fontWeight: '600',
    marginBottom: Theme.spacing.xs,
  },
  mediaYear: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xxl,
    minHeight: 300,
  },
  emptyText: {
    ...Theme.typography.body,
    color: Theme.colors.textTertiary,
    marginTop: Theme.spacing.md,
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
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.sm,
  },
  modalDescription: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
  },
  modalYear: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
    marginBottom: Theme.spacing.xs,
  },
  modalSource: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
  },
});

