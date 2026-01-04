import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';
import { pickAndUploadImage, UploadResult } from '@/utils/imageUpload';
import { LinearGradient } from 'expo-linear-gradient';

interface ImagePickerButtonProps {
  value?: string;
  onChange: (url: string | null) => void;
  label?: string;
  folder?: 'legends' | 'stories' | 'media';
  aspectRatio?: [number, number];
  multiple?: boolean;
  onMultipleChange?: (urls: string[]) => void;
}

export function ImagePickerButton({
  value,
  onChange,
  label = 'Selecionar Imagem',
  folder = 'legends',
  aspectRatio,
  multiple = false,
  onMultipleChange,
}: ImagePickerButtonProps) {
  const [uploading, setUploading] = useState(false);

  const handlePickImage = async () => {
    setUploading(true);
    try {
      const result = await pickAndUploadImage(folder);
      if (result) {
        onChange(result.url);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    Alert.alert('Remover imagem', 'Deseja remover esta imagem?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => onChange(null),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      {value ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: value }} style={styles.previewImage} resizeMode="cover" />
          <View style={styles.imageOverlay}>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={handlePickImage}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <MaterialIcons name="edit" size={18} color="#fff" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemoveImage}
            >
              <MaterialIcons name="close" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={handlePickImage}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color={Theme.colors.primary} />
          ) : (
            <>
              <LinearGradient
                colors={Theme.colors.gradientPrimary}
                style={styles.iconContainer}
              >
                <MaterialIcons name="add-photo-alternate" size={32} color="#fff" />
              </LinearGradient>
              <Text style={styles.pickerButtonText}>{label}</Text>
              <Text style={styles.pickerButtonHint}>Toque para selecionar</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    ...Theme.typography.body,
    fontWeight: '600',
    marginBottom: Theme.spacing.sm,
  },
  pickerButton: {
    borderWidth: 2,
    borderColor: Theme.colors.border,
    borderStyle: 'dashed',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.backgroundLight,
    minHeight: 150,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  pickerButtonText: {
    ...Theme.typography.body,
    fontWeight: '600',
    marginBottom: Theme.spacing.xs,
  },
  pickerButtonHint: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  previewImage: {
    width: '100%',
    height: 200,
    backgroundColor: Theme.colors.backgroundLight,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: Theme.spacing.sm,
    flexDirection: 'row',
    gap: Theme.spacing.xs,
  },
  changeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

