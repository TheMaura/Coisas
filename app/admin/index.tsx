import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Legend } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';

export default function AdminScreen() {
  const [legends, setLegends] = useState<Legend[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchLegends();
    }, [])
  );

  const fetchLegends = async () => {
    try {
      const { data, error } = await supabase
        .from('legends')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLegends(data || []);
    } catch (error) {
      console.error('Error fetching legends:', error);
      Alert.alert('Erro', 'Não foi possível carregar as lendas');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchLegends();
  };

  const deleteLegend = (legend: Legend) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir ${legend.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('legends')
                .delete()
                .eq('id', legend.id);

              if (error) throw error;
              fetchLegends();
            } catch (error: any) {
              Alert.alert('Erro', error.message);
            }
          },
        },
      ]
    );
  };

  const renderLegendItem = ({ item }: { item: Legend }) => (
    <View style={styles.legendCard}>
      {item.image_url && (
        <Image source={{ uri: item.image_url }} style={styles.legendImage} />
      )}
      <View style={styles.legendInfo}>
        <Text style={styles.legendName}>{item.name}</Text>
        <Text style={styles.legendDetails}>
          {item.nationality || ''} {item.nationality && item.position ? '•' : ''} {item.position || ''}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push(`/admin/edit/${item.id}`)}
        >
          <MaterialIcons name="edit" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => deleteLegend(item)}
        >
          <MaterialIcons name="delete" size={24} color="#ff3b30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/admin/create')}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Nova Lenda</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={legends}
          renderItem={renderLegendItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma lenda cadastrada</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    margin: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 10,
  },
  legendCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  legendImage: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
  },
  legendInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  legendName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  legendDetails: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  actionButton: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

