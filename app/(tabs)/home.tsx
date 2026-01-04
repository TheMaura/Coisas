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
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Legend } from '@/types';

export default function HomeScreen() {
  const [legends, setLegends] = useState<Legend[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLegends();
  }, []);

  const fetchLegends = async () => {
    try {
      const { data, error } = await supabase
        .from('legends')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setLegends(data || []);
    } catch (error) {
      console.error('Error fetching legends:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchLegends();
  };

  const renderLegendItem = ({ item }: { item: Legend }) => (
    <TouchableOpacity
      style={styles.legendCard}
      onPress={() => router.push(`/legend/${item.id}`)}
    >
      {item.image_url && (
        <Image source={{ uri: item.image_url }} style={styles.legendImage} />
      )}
      <View style={styles.legendInfo}>
        <Text style={styles.legendName}>{item.name}</Text>
        {item.nationality && <Text style={styles.legendNationality}>{item.nationality}</Text>}
        {item.position && <Text style={styles.legendPosition}>{item.position}</Text>}
        {item.current_club && <Text style={styles.legendClub}>{item.current_club}</Text>}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
            <Text style={styles.emptyText}>Nenhuma lenda encontrada</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  legendImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
  },
  legendInfo: {
    padding: 15,
  },
  legendName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  legendNationality: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  legendPosition: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 3,
  },
  legendClub: {
    fontSize: 14,
    color: '#666',
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

