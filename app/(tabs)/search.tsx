import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Legend } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [legends, setLegends] = useState<Legend[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchLegends();
    } else {
      setLegends([]);
    }
  }, [searchQuery, selectedFilter]);

  const searchLegends = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('legends')
        .select('*')
        .or(`name.ilike.%${searchQuery}%,full_name.ilike.%${searchQuery}%`);

      query = query.eq('is_active', true);
      
      if (selectedFilter !== 'all') {
        if (selectedFilter === 'nationality') {
          query = query.ilike('nationality', `%${searchQuery}%`);
        } else if (selectedFilter === 'club') {
          query = query.ilike('current_club', `%${searchQuery}%`);
        } else if (selectedFilter === 'position') {
          query = query.ilike('position', `%${searchQuery}%`);
        }
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;
      setLegends(data || []);
    } catch (error) {
      console.error('Error searching legends:', error);
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.legendDetails}>
          {item.nationality || ''} {item.nationality && item.position ? '•' : ''} {item.position || ''}
        </Text>
        {item.current_club && <Text style={styles.legendClub}>{item.current_club}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar lendas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialIcons name="close" size={24} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por:</Text>
        <View style={styles.filterButtons}>
          {['all', 'nationality', 'club', 'position'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === filter && styles.filterButtonTextActive,
                ]}
              >
                {filter === 'all'
                  ? 'Tudo'
                  : filter === 'nationality'
                  ? 'Nacionalidade'
                  : filter === 'club'
                  ? 'Clube'
                  : 'Posição'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

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
          ListEmptyComponent={
            searchQuery.length > 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhuma lenda encontrada</Text>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  Digite para buscar lendas do futebol
                </Text>
              </View>
            )
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
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
    marginBottom: 3,
  },
  legendClub: {
    fontSize: 14,
    color: '#007AFF',
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

