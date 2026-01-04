import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { supabase } from '@/lib/supabase';
import { Alert, Platform } from 'react-native';

export interface UploadResult {
  url: string;
  path: string;
}

/**
 * Decodifica string base64 para string binária (compatível com React Native)
 */
function base64Decode(base64: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  
  base64 = base64.replace(/[^A-Za-z0-9\+\/\=]/g, '');
  
  for (let i = 0; i < base64.length; i += 4) {
    const enc1 = chars.indexOf(base64.charAt(i));
    const enc2 = chars.indexOf(base64.charAt(i + 1));
    const enc3 = chars.indexOf(base64.charAt(i + 2));
    const enc4 = chars.indexOf(base64.charAt(i + 3));
    
    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;
    
    output += String.fromCharCode(chr1);
    if (enc3 !== 64) output += String.fromCharCode(chr2);
    if (enc4 !== 64) output += String.fromCharCode(chr3);
  }
  
  return output;
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

    // Verificar se o usuário está autenticado
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Você precisa estar logado para fazer upload de imagens');
    }

    // Ler arquivo usando FileSystem (funciona corretamente no React Native)
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Converter base64 para ArrayBuffer
    let bytes: Uint8Array;
    
    if (Platform.OS === 'web') {
      // Web: usar atob
      const binaryString = atob(base64);
      bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
    } else {
      // Mobile: decodificar base64 manualmente
      const decoded = base64Decode(base64);
      bytes = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
      }
    }

    // Upload para Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, bytes, {
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
