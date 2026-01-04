import React, { useState } from 'react';
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
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '@/components/GradientButton';
import { AnimatedCard } from '@/components/AnimatedCard';
import { sendLocalNotification } from '@/utils/notifications';

export default function AdminNotificationsScreen() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    legend_id: '',
    type: 'general' as 'general' | 'legend' | 'update',
  });

  const sendNotification = async () => {
    if (!formData.title || !formData.message) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    try {
      // Buscar todos os tokens de notificação
      const { data: tokens, error: tokensError } = await supabase
        .from('notification_tokens')
        .select('token, user_id');

      if (tokensError) throw tokensError;

      // Criar registro de notificação no banco
      // Usar 'read' para compatibilidade com o schema atual
      const notificationData: any = {
        title: formData.title,
        message: formData.message,
        type: formData.type,
        read: false, // Schema usa 'read', não 'is_read'
        is_read: false, // Fallback caso tenha sido alterado
      };

      if (formData.legend_id) {
        notificationData.legend_id = formData.legend_id;
      }

      // Buscar todos os usuários para criar notificações
      const { data: allUsers, error: usersError } = await supabase
        .from('profiles')
        .select('id');

      if (usersError) {
        console.warn('Error fetching users, creating notification without user_id:', usersError);
        // Criar notificação geral sem user_id específico (visível para todos)
        const { error: notifError } = await supabase
          .from('notifications')
          .insert([notificationData]);

        if (notifError) throw notifError;
      } else if (allUsers && allUsers.length > 0) {
        // Criar notificação para cada usuário
        const notifications = allUsers.map((user) => ({
          ...notificationData,
          user_id: user.id,
        }));

        const { error: notifError } = await supabase
          .from('notifications')
          .insert(notifications);

        if (notifError) throw notifError;
      } else {
        // Criar notificação geral sem user_id específico (visível para todos)
        const { error: notifError } = await supabase
          .from('notifications')
          .insert([notificationData]);

        if (notifError) throw notifError;
      }

      // Enviar notificação local para teste
      await sendLocalNotification(formData.title, formData.message, {
        legend_id: formData.legend_id || undefined,
      });

      Alert.alert('Sucesso', 'Notificação enviada com sucesso!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      console.error('Error sending notification:', error);
      Alert.alert('Erro', error.message || 'Não foi possível enviar a notificação');
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
        <Text style={styles.headerTitle}>Enviar Notificação</Text>
        <Text style={styles.headerSubtitle}>Enviar notificação para todos os usuários</Text>
      </LinearGradient>

      <View style={styles.content}>
        <AnimatedCard delay={50}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            placeholder="Ex: Nova lenda adicionada!"
            placeholderTextColor={Theme.colors.textTertiary}
          />
        </AnimatedCard>

        <AnimatedCard delay={100}>
          <Text style={styles.label}>Mensagem *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.message}
            onChangeText={(text) => setFormData({ ...formData, message: text })}
            placeholder="Digite a mensagem da notificação..."
            placeholderTextColor={Theme.colors.textTertiary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </AnimatedCard>

        <AnimatedCard delay={150}>
          <Text style={styles.label}>Tipo</Text>
          <View style={styles.typeContainer}>
            {(['general', 'legend', 'update'] as const).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  formData.type === type && styles.typeButtonActive,
                ]}
                onPress={() => setFormData({ ...formData, type })}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    formData.type === type && styles.typeButtonTextActive,
                  ]}
                >
                  {type === 'general' ? 'Geral' : type === 'legend' ? 'Lenda' : 'Atualização'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AnimatedCard>

        <AnimatedCard delay={200}>
          <Text style={styles.label}>ID da Lenda (opcional)</Text>
          <TextInput
            style={styles.input}
            value={formData.legend_id}
            onChangeText={(text) => setFormData({ ...formData, legend_id: text })}
            placeholder="UUID da lenda relacionada"
            placeholderTextColor={Theme.colors.textTertiary}
          />
          <Text style={styles.hint}>
            Se preenchido, ao tocar na notificação o usuário será direcionado para a lenda
          </Text>
        </AnimatedCard>

        <AnimatedCard delay={250}>
          <GradientButton
            title={loading ? 'Enviando...' : 'Enviar Notificação'}
            onPress={sendNotification}
            loading={loading}
            variant="football"
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
    marginBottom: Theme.spacing.xs,
  },
  headerSubtitle: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
  },
  content: {
    padding: Theme.spacing.md,
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
  typeContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  typeButton: {
    flex: 1,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.backgroundLight,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  typeButtonActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  typeButtonText: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
  },
  typeButtonTextActive: {
    color: Theme.colors.text,
    fontWeight: '600',
  },
  hint: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
    marginTop: Theme.spacing.xs,
    fontSize: 12,
  },
});

