import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, profile, signOut } = useAuth();

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
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="person" size={60} color="#fff" />
        </View>
        <Text style={styles.name}>{profile?.full_name || 'Usuário'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/profile/edit')}
        >
          <MaterialIcons name="edit" size={24} color="#007AFF" />
          <Text style={styles.menuItemText}>Editar Perfil</Text>
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        {profile?.email && (
          <View style={styles.infoItem}>
            <MaterialIcons name="admin-panel-settings" size={24} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Acesso Admin</Text>
              <TouchableOpacity onPress={() => router.push('/admin')}>
                <Text style={styles.infoLink}>Gerenciar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <MaterialIcons name="logout" size={24} color="#ff3b30" />
          <Text style={[styles.menuItemText, styles.logoutText]}>Sair</Text>
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 15,
  },
  logoutText: {
    color: '#ff3b30',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoContent: {
    flex: 1,
    marginLeft: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  infoLink: {
    fontSize: 14,
    color: '#007AFF',
  },
});

