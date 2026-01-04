import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Legend } from '@/types';
import * as Sharing from 'expo-sharing';
import { MaterialIcons } from '@expo/vector-icons';

export default function LegendDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const [legend, setLegend] = useState<Legend | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchLegend();
    if (user) {
      checkFavorite();
    }
  }, [id, user]);

  const fetchLegend = async () => {
    try {
      const { data, error } = await supabase
        .from('legends')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      setLegend(data);
    } catch (error) {
      console.error('Error fetching legend:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lenda');
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('legend_id', id)
        .single();

      setIsFavorite(!!data && !error);
    } catch (error) {
      setIsFavorite(false);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      Alert.alert('Login necessário', 'Faça login para favoritar lendas');
      return;
    }

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('legend_id', id);

        if (error) throw error;
        setIsFavorite(false);
      } else {
        const { error } = await supabase.from('favorites').insert([
          {
            user_id: user.id,
            legend_id: id,
          },
        ]);

        if (error) throw error;
        setIsFavorite(true);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar favoritos');
    }
  };

  const handleShare = async () => {
    if (!legend) return;

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(legend.image_url || '', {
          message: `Conheça ${legend.name}: ${legend.biography.substring(0, 100)}...`,
        });
      } else {
        Alert.alert('Erro', 'Compartilhamento não disponível neste dispositivo');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!legend) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Lenda não encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {legend.image_url && (
        <Image source={{ uri: legend.image_url }} style={styles.headerImage} />
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.name}>{legend.name}</Text>
            {legend.full_name && (
              <Text style={styles.fullName}>{legend.full_name}</Text>
            )}
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={toggleFavorite}
            >
              <MaterialIcons
                name={isFavorite ? 'favorite' : 'favorite-border'}
                size={28}
                color={isFavorite ? '#ff3b30' : '#666'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <MaterialIcons name="share" size={28} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MaterialIcons name="flag" size={20} color="#007AFF" />
            <Text style={styles.infoText}>{legend.nationality}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="sports-soccer" size={20} color="#007AFF" />
            <Text style={styles.infoText}>{legend.position}</Text>
          </View>
          {legend.current_club && (
            <View style={styles.infoRow}>
              <MaterialIcons name="groups" size={20} color="#007AFF" />
              <Text style={styles.infoText}>{legend.current_club}</Text>
            </View>
          )}
          {legend.birth_date && (
            <View style={styles.infoRow}>
              <MaterialIcons name="cake" size={20} color="#007AFF" />
              <Text style={styles.infoText}>{new Date(legend.birth_date).toLocaleDateString('pt-BR')}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Biografia</Text>
          <Text style={styles.biography}>{legend.biography}</Text>
        </View>

        {legend.achievements && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conquistas</Text>
            {legend.achievements.split('\n').filter(a => a.trim()).map((achievement, index) => (
              <View key={index} style={styles.achievementItem}>
                <MaterialIcons name="star" size={20} color="#FFD700" />
                <Text style={styles.achievementText}>{achievement.trim()}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#ddd',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  titleSection: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  fullName: {
    fontSize: 16,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    padding: 5,
  },
  infoSection: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  biography: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 5,
  },
  achievementText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  videoButtonText: {
    fontSize: 18,
    color: '#007AFF',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
});

