import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Legend, SearchFilters } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { LegendCard } from '@/components/LegendCard';
import { AnimatedCard } from '@/components/AnimatedCard';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [legends, setLegends] = useState<Legend[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    nationality: '',
    position: '',
    club: '',
    sortBy: 'name',
    sortOrder: 'asc',
  });

  useEffect(() => {
    if (searchQuery.length > 2 || hasActiveFilters()) {
      searchLegends();
    } else {
      setLegends([]);
    }
  }, [searchQuery, filters]);

  const hasActiveFilters = () => {
    return !!(filters.nationality || filters.position || filters.club);
  };

  const searchLegends = async () => {
    setLoading(true);
    try {
      let query = supabase.from('legends').select('*').eq('is_active', true);

      // Busca por texto
      if (searchQuery.length > 2) {
        query = query.or(`name.ilike.%${searchQuery}%,full_name.ilike.%${searchQuery}%,biography.ilike.%${searchQuery}%`);
      }

      // Filtros
      if (filters.nationality) {
        query = query.ilike('nationality', `%${filters.nationality}%`);
      }
      if (filters.position) {
        query = query.ilike('position', `%${filters.position}%`);
      }
      if (filters.club) {
        query = query.or(`current_club.ilike.%${filters.club}%,club.ilike.%${filters.club}%`);
      }

      // Ordenação
      const orderColumn = filters.sortBy === 'popularity' ? 'created_at' : filters.sortBy || 'name';
      query = query.order(orderColumn, { ascending: filters.sortOrder === 'asc' });

      const { data, error } = await query.limit(50);

      if (error) throw error;
      setLegends(data || []);
    } catch (error) {
      console.error('Error searching legends:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      nationality: '',
      position: '',
      club: '',
      sortBy: 'name',
      sortOrder: 'asc',
    });
  };

  const renderLegendItem = ({ item, index }: { item: Legend; index: number }) => (
    <LegendCard
      legend={item}
      onPress={() => router.push(`/legend/${item.id}`)}
      delay={Math.min(index * 30, 300)} // Limitar delay máximo
    />
  );

  const nationalities = ['Brasil', 'Argentina', 'Portugal', 'Espanha', 'França', 'Itália', 'Alemanha', 'Inglaterra'];
  const positions = ['Atacante', 'Meio-campista', 'Defensor', 'Goleiro'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={Theme.colors.gradientDark}
        style={styles.header}
      >
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color={Theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar lendas..."
            placeholderTextColor={Theme.colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={24} color={Theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <MaterialIcons
            name={showFilters ? 'filter-list' : 'tune'}
            size={20}
            color={Theme.colors.text}
          />
          <Text style={styles.filterButtonText}>
            {showFilters ? 'Ocultar' : 'Filtros'}
          </Text>
          {hasActiveFilters() && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>!</Text>
            </View>
          )}
        </TouchableOpacity>

        {showFilters && (
          <AnimatedCard style={styles.filtersContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Nacionalidade</Text>
                <ScrollView horizontal style={styles.filterChips}>
                  {nationalities.map((nat) => (
                    <TouchableOpacity
                      key={nat}
                      style={[
                        styles.filterChip,
                        filters.nationality === nat && styles.filterChipActive,
                      ]}
                      onPress={() =>
                        setFilters({ ...filters, nationality: filters.nationality === nat ? '' : nat })
                      }
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          filters.nationality === nat && styles.filterChipTextActive,
                        ]}
                      >
                        {nat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Posição</Text>
                <ScrollView horizontal style={styles.filterChips}>
                  {positions.map((pos) => (
                    <TouchableOpacity
                      key={pos}
                      style={[
                        styles.filterChip,
                        filters.position === pos && styles.filterChipActive,
                      ]}
                      onPress={() =>
                        setFilters({ ...filters, position: filters.position === pos ? '' : pos })
                      }
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          filters.position === pos && styles.filterChipTextActive,
                        ]}
                      >
                        {pos}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Ordenar</Text>
                <View style={styles.sortOptions}>
                  <TouchableOpacity
                    style={[
                      styles.sortButton,
                      filters.sortBy === 'name' && styles.sortButtonActive,
                    ]}
                    onPress={() => setFilters({ ...filters, sortBy: 'name' })}
                  >
                    <Text
                      style={[
                        styles.sortButtonText,
                        filters.sortBy === 'name' && styles.sortButtonTextActive,
                      ]}
                    >
                      Nome
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.sortButton,
                      filters.sortBy === 'created_at' && styles.sortButtonActive,
                    ]}
                    onPress={() => setFilters({ ...filters, sortBy: 'created_at' })}
                  >
                    <Text
                      style={[
                        styles.sortButtonText,
                        filters.sortBy === 'created_at' && styles.sortButtonTextActive,
                      ]}
                    >
                      Recente
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.sortOrderButton}
                    onPress={() =>
                      setFilters({
                        ...filters,
                        sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    <MaterialIcons
                      name={filters.sortOrder === 'asc' ? 'arrow-upward' : 'arrow-downward'}
                      size={20}
                      color={Theme.colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {hasActiveFilters() && (
                <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                  <MaterialIcons name="clear" size={18} color={Theme.colors.error} />
                  <Text style={styles.clearButtonText}>Limpar</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </AnimatedCard>
        )}
      </LinearGradient>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={legends}
          renderItem={renderLegendItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          removeClippedSubviews={false}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          windowSize={10}
          initialNumToRender={10}
          ListEmptyComponent={
            searchQuery.length > 2 || hasActiveFilters() ? (
              <View style={styles.emptyContainer}>
                <MaterialIcons name="search-off" size={64} color={Theme.colors.textTertiary} />
                <Text style={styles.emptyText}>Nenhuma lenda encontrada</Text>
                <Text style={styles.emptySubtext}>
                  Tente ajustar os filtros ou buscar por outro termo
                </Text>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <MaterialIcons name="search" size={64} color={Theme.colors.textTertiary} />
                <Text style={styles.emptyText}>Busque por lendas</Text>
                <Text style={styles.emptySubtext}>
                  Digite pelo menos 3 caracteres ou use os filtros
                </Text>
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundCard,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.sm,
  },
  searchIcon: {
    marginRight: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
    fontSize: 16,
    color: Theme.colors.text,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Theme.colors.backgroundCard,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    gap: Theme.spacing.xs,
    position: 'relative',
  },
  filterButtonText: {
    ...Theme.typography.body,
    fontWeight: '600',
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  filtersContainer: {
    marginTop: Theme.spacing.md,
    maxHeight: 200,
  },
  filterSection: {
    marginRight: Theme.spacing.lg,
  },
  filterLabel: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
    fontWeight: '600',
  },
  filterChips: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.backgroundLight,
    marginRight: Theme.spacing.sm,
  },
  filterChipActive: {
    backgroundColor: Theme.colors.primary,
  },
  filterChipText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
  filterChipTextActive: {
    color: Theme.colors.text,
    fontWeight: '600',
  },
  sortOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  sortButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.backgroundLight,
  },
  sortButtonActive: {
    backgroundColor: Theme.colors.primary,
  },
  sortButtonText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
  sortButtonTextActive: {
    color: Theme.colors.text,
    fontWeight: '600',
  },
  sortOrderButton: {
    padding: Theme.spacing.sm,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.xs,
  },
  clearButtonText: {
    ...Theme.typography.caption,
    color: Theme.colors.error,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: Theme.spacing.md,
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
