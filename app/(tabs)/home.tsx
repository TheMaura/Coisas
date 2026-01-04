import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Legend } from '@/types';
import { LegendCard } from '@/components/LegendCard';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

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

  const renderLegendItem = ({ item, index }: { item: Legend; index: number }) => (
    <LegendCard
      legend={item}
      onPress={() => router.push(`/legend/${item.id}`)}
      delay={index * 100}
    />
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={Theme.colors.gradientDark}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Futebol Legends</Text>
            <Text style={styles.headerSubtitle}>As maiores lendas do futebol</Text>
          </View>
          <View style={styles.iconContainer}>
            <MaterialIcons name="sports-soccer" size={32} color={Theme.colors.footballLight} />
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={legends}
        renderItem={renderLegendItem}
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
            <MaterialIcons name="sports-soccer" size={64} color={Theme.colors.textTertiary} />
            <Text style={styles.emptyText}>Nenhuma lenda encontrada</Text>
            <Text style={styles.emptySubtext}>
              As lendas aparecerão aqui quando forem adicionadas
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
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: Theme.spacing.md,
    paddingTop: Theme.spacing.md,
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
