import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Notification } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCard } from '@/components/AnimatedCard';

export default function NotificationsScreen() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        fetchNotifications();
      }
    }, [user])
  );

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      console.log('Fetching notifications for user:', user.id);
      
      // Buscar notificações do usuário OU notificações gerais (sem user_id)
      // Usar duas queries separadas para garantir que ambas funcionem
      const [userNotifications, generalNotifications] = await Promise.all([
        supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('notifications')
          .select('*')
          .is('user_id', null)
          .order('created_at', { ascending: false })
          .limit(50),
      ]);

      if (userNotifications.error) {
        console.error('Error fetching user notifications:', userNotifications.error);
      }
      if (generalNotifications.error) {
        console.error('Error fetching general notifications:', generalNotifications.error);
      }

      // Combinar e remover duplicatas
      const allNotifications = [
        ...(userNotifications.data || []),
        ...(generalNotifications.data || []),
      ];

      // Remover duplicatas baseado no ID
      const uniqueNotifications = allNotifications.filter(
        (notification, index, self) =>
          index === self.findIndex((n) => n.id === notification.id)
      );

      // Ordenar por data mais recente
      uniqueNotifications.sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA;
      });

      console.log(`Fetched ${uniqueNotifications.length} notifications (${userNotifications.data?.length || 0} user-specific, ${generalNotifications.data?.length || 0} general)`);
      setNotifications(uniqueNotifications.slice(0, 50));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  const markAsRead = async (notificationId: string) => {
    try {
      // Tentar atualizar com ambos os nomes de coluna para compatibilidade
      const updateData: any = { is_read: true, read: true };
      await supabase
        .from('notifications')
        .update(updateData)
        .eq('id', notificationId);
      
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleNotificationPress = async (notification: Notification) => {
    const isRead = notification.is_read ?? notification.read ?? false;
    if (!isRead) {
      await markAsRead(notification.id);
    }

    if (notification.legend_id) {
      router.push(`/legend/${notification.legend_id}`);
    }
  };

  const renderNotificationItem = ({ item, index }: { item: Notification; index: number }) => {
    const iconName = 
      item.type === 'legend' ? 'sports-soccer' :
      item.type === 'update' ? 'update' :
      'notifications';
    
    const isRead = item.is_read ?? item.read ?? false;

    return (
      <AnimatedCard delay={index * 30} style={styles.notificationCard}>
        <TouchableOpacity
          style={[
            styles.cardContent,
            !isRead && styles.unreadCard,
          ]}
          onPress={() => handleNotificationPress(item)}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons
              name={iconName as any}
              size={24}
              color={isRead ? Theme.colors.textSecondary : Theme.colors.primary}
            />
          </View>
          <View style={styles.notificationInfo}>
            <Text style={[
              styles.notificationTitle,
              !isRead && styles.unreadTitle,
            ]}>
              {item.title}
            </Text>
            <Text style={styles.notificationMessage} numberOfLines={2}>
              {item.message}
            </Text>
            <Text style={styles.notificationDate}>
              {new Date(item.created_at || new Date()).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
          {!isRead && (
            <View style={styles.unreadDot} />
          )}
        </TouchableOpacity>
      </AnimatedCard>
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.emptyContainer}>
          <MaterialIcons name="notifications-off" size={64} color={Theme.colors.textTertiary} />
          <Text style={styles.emptyText}>Faça login para ver notificações</Text>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  const unreadCount = notifications.filter(n => !(n.is_read ?? n.read ?? false)).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={Theme.colors.gradientDark}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Notificações</Text>
            <Text style={styles.headerSubtitle}>
              {unreadCount > 0 && `${unreadCount} não lidas • `}
              {notifications.length} {notifications.length === 1 ? 'notificação' : 'notificações'}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <MaterialIcons name="notifications" size={32} color={Theme.colors.primaryLight} />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
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
            <MaterialIcons name="notifications-none" size={64} color={Theme.colors.textTertiary} />
            <Text style={styles.emptyText}>Nenhuma notificação</Text>
            <Text style={styles.emptySubtext}>
              Você será notificado sobre novidades e atualizações
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(90, 200, 250, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Theme.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  listContent: {
    padding: Theme.spacing.md,
  },
  notificationCard: {
    marginBottom: Theme.spacing.md,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.sm,
  },
  unreadCard: {
    backgroundColor: 'rgba(90, 200, 250, 0.1)',
    borderRadius: Theme.borderRadius.md,
  },
  notificationInfo: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  notificationTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  unreadTitle: {
    fontWeight: '700',
  },
  notificationMessage: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  notificationDate: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
    fontSize: 11,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.primary,
    marginLeft: Theme.spacing.sm,
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
    marginBottom: Theme.spacing.sm,
  },
  emptySubtext: {
    ...Theme.typography.body,
    color: Theme.colors.textTertiary,
    textAlign: 'center',
  },
});

