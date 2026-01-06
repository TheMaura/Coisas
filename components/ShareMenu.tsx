import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
  Alert,
  Share as RNShare,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Clipboard from 'expo-clipboard';

interface ShareMenuProps {
  visible: boolean;
  onClose: () => void;
  content: {
    title: string;
    text: string;
    url?: string;
    image?: string;
  };
}

export function ShareMenu({ visible, onClose, content }: ShareMenuProps) {
  const { title, text, url } = content;

  const shareToWhatsApp = async () => {
    try {
      const message = `${title}\n\n${text}${url ? `\n\n${url}` : ''}`;
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
      
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
        onClose();
      } else {
        // Tentar versão web se app não estiver instalado
        const webUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        await Linking.openURL(webUrl);
        onClose();
      }
    } catch (error) {
      console.error('Error sharing to WhatsApp:', error);
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp');
    }
  };

  const shareToFacebook = async () => {
    try {
      const shareUrl = url || 'https://futebol-legends.app';
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(`${title}\n\n${text}`)}`;
      
      await Linking.openURL(facebookUrl);
      onClose();
    } catch (error) {
      console.error('Error sharing to Facebook:', error);
      Alert.alert('Erro', 'Não foi possível abrir o Facebook');
    }
  };

  const shareToTwitter = async () => {
    try {
      const shareUrl = url || 'https://futebol-legends.app';
      const tweetText = `${title}\n\n${text}`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
      
      await Linking.openURL(twitterUrl);
      onClose();
    } catch (error) {
      console.error('Error sharing to Twitter:', error);
      Alert.alert('Erro', 'Não foi possível abrir o Twitter');
    }
  };

  const shareToInstagram = async () => {
    try {
      // Instagram Stories (requer app instalado)
      if (content.image) {
        const instagramUrl = `instagram://camera`;
        const canOpen = await Linking.canOpenURL(instagramUrl);
        
        if (canOpen) {
          Alert.alert(
            'Instagram',
            'A imagem será copiada. Abra o Instagram e cole na sua história.',
            [
              { text: 'Cancelar', style: 'cancel' },
              {
                text: 'OK',
                onPress: async () => {
                  // Copiar texto para clipboard
                  const message = `${title}\n\n${text}${url ? `\n\n${url}` : ''}`;
                  await Clipboard.setStringAsync(message);
                  await Linking.openURL(instagramUrl);
                  onClose();
                },
              },
            ]
          );
        } else {
          Alert.alert('Instagram', 'Por favor, instale o aplicativo Instagram para compartilhar');
        }
      } else {
        Alert.alert('Instagram', 'Instagram requer uma imagem para compartilhar');
      }
    } catch (error) {
      console.error('Error sharing to Instagram:', error);
      Alert.alert('Erro', 'Não foi possível abrir o Instagram');
    }
  };

  const shareToTelegram = async () => {
    try {
      const message = `${title}\n\n${text}${url ? `\n\n${url}` : ''}`;
      const telegramUrl = `tg://msg?text=${encodeURIComponent(message)}`;
      
      const canOpen = await Linking.canOpenURL(telegramUrl);
      if (canOpen) {
        await Linking.openURL(telegramUrl);
        onClose();
      } else {
        // Versão web
        const webUrl = `https://t.me/share/url?url=${encodeURIComponent(url || '')}&text=${encodeURIComponent(message)}`;
        await Linking.openURL(webUrl);
        onClose();
      }
    } catch (error) {
      console.error('Error sharing to Telegram:', error);
      Alert.alert('Erro', 'Não foi possível abrir o Telegram');
    }
  };

  const shareNative = async () => {
    try {
      const message = `${title}\n\n${text}${url ? `\n\n${url}` : ''}`;
      const result = await RNShare.share({
        message,
        url: url,
        title: title,
      }, {
        dialogTitle: 'Compartilhar',
      });
      
      if (result.action === RNShare.sharedAction) {
        onClose();
      }
    } catch (error) {
      console.error('Error sharing natively:', error);
      Alert.alert('Erro', 'Não foi possível compartilhar');
    }
  };

  const copyToClipboard = async () => {
    try {
      const message = `${title}\n\n${text}${url ? `\n\n${url}` : ''}`;
      await Clipboard.setStringAsync(message);
      Alert.alert('Copiado!', 'O conteúdo foi copiado para a área de transferência');
      onClose();
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      Alert.alert('Erro', 'Não foi possível copiar');
    }
  };

  const socialButtons = [
    { name: 'WhatsApp', icon: 'chat', color: '#25D366', onPress: shareToWhatsApp },
    { name: 'Facebook', icon: 'facebook', color: '#1877F2', onPress: shareToFacebook },
    { name: 'Twitter', icon: 'alternate-email', color: '#1DA1F2', onPress: shareToTwitter },
    { name: 'Instagram', icon: 'photo-camera', color: '#E4405F', onPress: shareToInstagram },
    { name: 'Telegram', icon: 'send', color: '#0088CC', onPress: shareToTelegram },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <BlurView intensity={20} style={styles.blurContainer}>
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>Compartilhar</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <MaterialIcons name="close" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
              </View>

              <View style={styles.socialGrid}>
                {socialButtons.map((social) => (
                  <TouchableOpacity
                    key={social.name}
                    style={styles.socialButton}
                    onPress={social.onPress}
                  >
                    <LinearGradient
                      colors={[social.color, social.color + 'DD']}
                      style={styles.socialIconContainer}
                    >
                      <MaterialIcons name={social.icon as any} size={32} color="#fff" />
                    </LinearGradient>
                    <Text style={styles.socialLabel}>{social.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.otherOptions}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={shareNative}
                >
                  <MaterialIcons name="share" size={24} color={Theme.colors.primary} />
                  <Text style={styles.optionText}>Mais opções</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={copyToClipboard}
                >
                  <MaterialIcons name="content-copy" size={24} color={Theme.colors.primary} />
                  <Text style={styles.optionText}>Copiar link</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </BlurView>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Theme.spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? 40 : Theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  title: {
    ...Theme.typography.h2,
    fontSize: 24,
  },
  closeButton: {
    padding: Theme.spacing.xs,
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: Theme.spacing.lg,
  },
  socialButton: {
    alignItems: 'center',
    width: '18%',
    marginBottom: Theme.spacing.md,
  },
  socialIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  socialLabel: {
    ...Theme.typography.caption,
    fontSize: 12,
    textAlign: 'center',
  },
  otherOptions: {
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    paddingTop: Theme.spacing.md,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.sm,
  },
  optionText: {
    ...Theme.typography.body,
    marginLeft: Theme.spacing.md,
  },
});

