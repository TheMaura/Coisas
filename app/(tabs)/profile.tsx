import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCard } from '@/components/AnimatedCard';
import { GradientButton } from '@/components/GradientButton';

export default function ProfileScreen() {
  const { user, profile, signOut, refreshProfile } = useAuth();

  // Recarregar perfil quando a tela receber foco
  useFocusEffect(
    React.useCallback(() => {
      refreshProfile();
    }, [refreshProfile])
  );

  const handleSignOut = async () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
            router.replace('/(auth)/login');
          } catch (error: any) {
            Alert.alert('Erro', error.message);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={Theme.colors.gradientDark}
        style={styles.header}
      >
        <View style={styles.avatarContainer}>
          {profile?.avatar_url ? (
            <Image
              source={{ uri: profile.avatar_url }}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          ) : (
            <LinearGradient
              colors={Theme.colors.gradientPrimary}
              style={styles.avatarGradient}
            >
              <MaterialIcons name="person" size={48} color={Theme.colors.text} />
            </LinearGradient>
          )}
        </View>
        <Text style={styles.name}>{profile?.full_name || profile?.name || 'Usuário'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        {profile?.bio && (
          <Text style={styles.bio} numberOfLines={3}>
            {profile.bio}
          </Text>
        )}
        {profile?.is_admin && (
          <View style={styles.adminBadge}>
            <MaterialIcons name="admin-panel-settings" size={16} color="#FFD700" />
            <Text style={styles.adminText}>Administrador</Text>
          </View>
        )}
      </LinearGradient>

      <View style={styles.menuSection}>
        <AnimatedCard delay={100}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/profile/edit')}
          >
            <View style={styles.menuIconContainer}>
              <MaterialIcons name="edit" size={24} color={Theme.colors.primaryLight} />
            </View>
            <Text style={styles.menuItemText}>Editar Perfil</Text>
            <MaterialIcons name="chevron-right" size={24} color={Theme.colors.textTertiary} />
          </TouchableOpacity>
        </AnimatedCard>

        {profile?.is_admin && (
          <AnimatedCard delay={150}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/admin')}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: 'rgba(255, 215, 0, 0.2)' }]}>
                <MaterialIcons name="admin-panel-settings" size={24} color="#FFD700" />
              </View>
              <Text style={[styles.menuItemText, { color: '#FFD700' }]}>Painel Admin</Text>
              <MaterialIcons name="chevron-right" size={24} color={Theme.colors.textTertiary} />
            </TouchableOpacity>
          </AnimatedCard>
        )}

        <AnimatedCard delay={200}>
          <GradientButton
            title="Sair"
            onPress={handleSignOut}
            variant="primary"
            style={styles.logoutButton}
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
    paddingBottom: Theme.spacing.xl,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: Theme.spacing.md,
  },
  avatarGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.lg,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    ...Theme.shadows.lg,
  },
  name: {
    ...Theme.typography.h1,
    fontSize: 28,
    marginBottom: Theme.spacing.xs,
  },
  email: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
  },
  bio: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.xs,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    gap: Theme.spacing.xs,
    marginTop: Theme.spacing.sm,
  },
  adminText: {
    ...Theme.typography.caption,
    color: '#FFD700',
    fontWeight: '600',
  },
  menuSection: {
    padding: Theme.spacing.md,
    paddingTop: Theme.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(90, 200, 250, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  menuItemText: {
    flex: 1,
    ...Theme.typography.body,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: Theme.spacing.md,
  },
});
