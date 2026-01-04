import * as Sharing from 'expo-sharing';
import { Linking, Platform, Alert } from 'react-native';
import { Legend, Story } from '@/types';

export const shareLegend = async (legend: Legend) => {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      const message = `🏆 ${legend.name}\n\n${legend.biography?.substring(0, 200)}...\n\nDescubra mais sobre esta lenda no Futebol Legends!`;
      
      if (legend.image_url) {
        await Sharing.shareAsync(legend.image_url, {
          message,
        });
      } else {
        await Sharing.shareAsync(message);
      }
    } else {
      // Fallback para web ou quando sharing não está disponível
      const shareUrl = `https://futebol-legends.app/legend/${legend.id}`;
      const shareText = `${legend.name} - Futebol Legends\n\n${shareUrl}`;
      
      if (Platform.OS === 'web') {
        if (navigator.share) {
          await navigator.share({
            title: legend.name,
            text: shareText,
            url: shareUrl,
          });
        } else {
          // Copiar para clipboard
          await navigator.clipboard.writeText(shareText);
          Alert.alert('Link copiado!', 'O link foi copiado para a área de transferência.');
        }
      } else {
        Alert.alert('Compartilhar', shareText);
      }
    }
  } catch (error) {
    console.error('Error sharing legend:', error);
  }
};

export const shareStory = async (story: Story) => {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      const message = `📖 ${story.title}\n\n${story.content.substring(0, 200)}...\n\nLeia a história completa no Futebol Legends!`;
      
      if (story.image_url) {
        await Sharing.shareAsync(story.image_url, {
          message,
        });
      } else {
        await Sharing.shareAsync(message);
      }
    } else {
      const shareText = `${story.title}\n\n${story.content.substring(0, 200)}...`;
      Alert.alert('Compartilhar História', shareText);
    }
  } catch (error) {
    console.error('Error sharing story:', error);
  }
};

export const shareToSocialMedia = async (
  platform: 'whatsapp' | 'facebook' | 'twitter' | 'instagram',
  content: { title: string; text: string; url?: string; image?: string }
) => {
  const { title, text, url, image } = content;
  let shareUrl = '';

  try {
    switch (platform) {
      case 'whatsapp':
        shareUrl = `whatsapp://send?text=${encodeURIComponent(`${title}\n\n${text}${url ? `\n\n${url}` : ''}`)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url || '')}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title}\n\n${text}`)}&url=${encodeURIComponent(url || '')}`;
        break;
      case 'instagram':
        // Instagram não suporta sharing direto via URL
        Alert.alert('Instagram', 'Copie a imagem e compartilhe no Instagram');
        return;
    }

    const canOpen = await Linking.canOpenURL(shareUrl);
    if (canOpen) {
      await Linking.openURL(shareUrl);
    } else {
      Alert.alert('Erro', `${platform} não está instalado ou não está disponível`);
    }
  } catch (error) {
    console.error(`Error sharing to ${platform}:`, error);
    Alert.alert('Erro', `Não foi possível compartilhar no ${platform}`);
  }
};

