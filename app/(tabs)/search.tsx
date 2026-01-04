import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Legend } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { LegendCard } from '@/components/LegendCard';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [legends, setLegends] = useState<Legend[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchLegends();
    } else {
      setLegends([]);
    }
  }, [searchQuery]);

  const searchLegends = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('legends')
        .select('*')
        .or(`name.ilike.%${searchQuery}%,full_name.ilike.%${searchQuery}%`)
        .eq('is_active', true)
        .limit(20);

      if (error) throw error;
      setLegends(data || []);
    } catch (error) {
      console.error('Error searching legends:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderLegendItem = ({ item, index }: { item: Legend; index: number }) => (
    <LegendCard
      legend={item}
      onPress={() => router.push(`/legend/${item.id}`)}
      delay={index * 50}
    />
  );

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
          ListEmptyComponent={
            searchQuery.length > 2 ? (
              <View style={styles.emptyContainer}>
                <MaterialIcons name="search-off" size={64} color={Theme.colors.textTertiary} />
                <Text style={styles.emptyText}>Nenhuma lenda encontrada</Text>
                <Text style={styles.emptySubtext}>
                  Tente buscar por nome, nacionalidade ou clube
                </Text>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <MaterialIcons name="search" size={64} color={Theme.colors.textTertiary} />
                <Text style={styles.emptyText}>Busque por lendas</Text>
                <Text style={styles.emptySubtext}>
                  Digite pelo menos 3 caracteres para começar
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
