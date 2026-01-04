import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';
import { Alert } from 'react-native';

export interface UploadResult {
  url: string;
  path: string;
}

/**
 * Solicita permissão e seleciona imagem da galeria
 */
export const pickImage = async (): Promise<string | null> => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso à galeria para selecionar imagens.'
      );
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) {
      return null;
    }

    return result.assets[0].uri;
  } catch (error) {
    console.error('Error picking image:', error);
    Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    return null;
  }
};

/**
 * Faz upload de imagem para Supabase Storage
 */
export const uploadImage = async (
  uri: string,
  folder: 'legends' | 'stories' | 'media' = 'legends',
  fileName?: string
): Promise<UploadResult | null> => {
  try {
    // Criar nome único para o arquivo
    const fileExt = uri.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const finalFileName = fileName || `${timestamp}-${randomString}.${fileExt}`;
    const filePath = `${folder}/${finalFileName}`;

    // Converter URI para blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Verificar se o usuário está autenticado
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Você precisa estar logado para fazer upload de imagens');
    }

    // Upload para Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, blob, {
        contentType: `image/${fileExt}`,
        upsert: true,
        cacheControl: '3600',
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      
      // Mensagem de erro mais amigável
      if (uploadError.message.includes('row-level security')) {
        throw new Error('Erro de permissão. Verifique se as políticas de Storage foram configuradas. Veja CORRIGIR_ERRO_STORAGE.md');
      }
      
      throw uploadError;
    }

    // Obter URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return {
      url: publicUrl,
      path: filePath,
    };
  } catch (error: any) {
    console.error('Error uploading image:', error);
    Alert.alert('Erro', error.message || 'Não foi possível fazer upload da imagem');
    return null;
  }
};

/**
 * Seleciona e faz upload de imagem em um único passo
 */
export const pickAndUploadImage = async (
  folder: 'legends' | 'stories' | 'media' = 'legends',
  fileName?: string
): Promise<UploadResult | null> => {
  const uri = await pickImage();
  if (!uri) return null;

  return await uploadImage(uri, folder, fileName);
};

/**
 * Seleciona múltiplas imagens
 */
export const pickMultipleImages = async (): Promise<string[]> => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso à galeria para selecionar imagens.'
      );
      return [];
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (result.canceled || !result.assets) {
      return [];
    }

    return result.assets.map((asset) => asset.uri);
  } catch (error) {
    console.error('Error picking multiple images:', error);
    Alert.alert('Erro', 'Não foi possível selecionar as imagens');
    return [];
  }
};

/**
 * Faz upload de múltiplas imagens
 */
export const uploadMultipleImages = async (
  uris: string[],
  folder: 'legends' | 'stories' | 'media' = 'legends'
): Promise<UploadResult[]> => {
  const results: UploadResult[] = [];

  for (const uri of uris) {
    const result = await uploadImage(uri, folder);
    if (result) {
      results.push(result);
    }
  }

  return results;
};

