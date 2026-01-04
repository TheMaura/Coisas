import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { GradientButton } from '@/components/GradientButton';
import { AnimatedCard } from '@/components/AnimatedCard';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen() {
  const { profile, updateProfile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setBio(profile.bio || '');
    }
  }, [profile]);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria para alterar a foto.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  const uploadImage = async (uri: string) => {
    if (!profile) return;

    setUploadingImage(true);
    try {
      // Criar nome único para o arquivo
      const fileExt = uri.split('.').pop();
      const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Converter URI para blob
      const response = await fetch(uri);
      const blob = await response.blob();

      // Upload para Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, {
          contentType: `image/${fileExt}`,
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Atualizar perfil com nova URL
      await updateProfile({ avatar_url: publicUrl });
      Alert.alert('Sucesso', 'Foto atualizada com sucesso!');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      Alert.alert('Erro', error.message || 'Não foi possível fazer upload da imagem');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile({
        full_name: fullName || null,
        bio: bio || null,
      });
      await refreshProfile();
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível atualizar o perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={Theme.colors.gradientDark}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
      </LinearGradient>

      <View style={styles.content}>
        <AnimatedCard style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            {profile?.avatar_url ? (
              <Image
                source={{ uri: profile.avatar_url }}
                style={styles.avatar}
              />
            ) : (
              <LinearGradient
                colors={Theme.colors.gradientPrimary}
                style={styles.avatarPlaceholder}
              >
                <MaterialIcons name="person" size={48} color="#fff" />
              </LinearGradient>
            )}
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={pickImage}
              disabled={uploadingImage}
            >
              {uploadingImage ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <MaterialIcons name="camera-alt" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.avatarHint}>Toque para alterar a foto</Text>
        </AnimatedCard>

        <AnimatedCard delay={100}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Seu nome completo"
            placeholderTextColor={Theme.colors.textTertiary}
          />
        </AnimatedCard>

        <AnimatedCard delay={150}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={bio}
            onChangeText={setBio}
            placeholder="Conte um pouco sobre você..."
            placeholderTextColor={Theme.colors.textTertiary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{bio.length}/200</Text>
        </AnimatedCard>

        <AnimatedCard delay={200}>
          <GradientButton
            title={loading ? 'Salvando...' : 'Salvar Alterações'}
            onPress={handleSave}
            loading={loading}
          />
        </AnimatedCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  content: {
    padding: Theme.spacing.md,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Theme.spacing.sm,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Theme.colors.background,
  },
  avatarHint: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
  },
  label: {
    ...Theme.typography.body,
    fontWeight: '600',
    marginBottom: Theme.spacing.sm,
  },
  input: {
    backgroundColor: Theme.colors.backgroundLight,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: 16,
    color: Theme.colors.text,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  textArea: {
    minHeight: 100,
    paddingTop: Theme.spacing.md,
  },
  charCount: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
    textAlign: 'right',
    marginTop: Theme.spacing.xs,
  },
});
