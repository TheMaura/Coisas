import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Trophy } from '@/types';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function TrophiesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [legendName, setLegendName] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: null, label: 'Todos', icon: 'trophy' },
    { id: 'club', label: 'Clubes', icon: 'groups' },
    { id: 'national', label: 'Seleções', icon: 'flag' },
    { id: 'individual', label: 'Individuais', icon: 'person' },
    { id: 'youth', label: 'Base', icon: 'child-care' },
  ];

  useEffect(() => {
    fetchLegendName();
    fetchTrophies();
  }, [id, selectedCategory]);

  const fetchLegendName = async () => {
    try {
      const { data } = await supabase
        .from('legends')
        .select('name')
        .eq('id', id)
        .single();
      if (data) setLegendName(data.name);
    } catch (error) {
      console.error('Error fetching legend name:', error);
    }
  };

  const fetchTrophies = async () => {
    try {
      let query = supabase
        .from('trophies')
        .select('*')
        .eq('legend_id', id)
        .order('year', { ascending: false })
        .order('is_major', { ascending: false });

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTrophies(data || []);
    } catch (error) {
      console.error('Error fetching trophies:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTrophies();
  };

  const groupTrophiesByYear = (trophies: Trophy[]) => {
    const grouped: { [year: number]: Trophy[] } = {};
    trophies.forEach((trophy) => {
      if (!grouped[trophy.year]) {
        grouped[trophy.year] = [];
      }
      grouped[trophy.year].push(trophy);
    });
    return grouped;
  };

  const renderTrophyItem = ({ item, index }: { item: Trophy; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 50)}>
      <TouchableOpacity
        style={[
          styles.trophyCard,
          item.is_major && styles.trophyCardMajor,
        ]}
      >
        {item.image_url && (
          <Image source={{ uri: item.image_url }} style={styles.trophyImage} />
        )}
        <View style={styles.trophyContent}>
          <View style={styles.trophyHeader}>
            <Text style={styles.trophyName}>{item.name}</Text>
            {item.is_major && (
              <MaterialIcons name="star" size={20} color="#FFD700" />
            )}
          </View>
          <Text style={styles.trophyCompetition}>{item.competition}</Text>
          {item.season && (
            <Text style={styles.trophySeason}>Temporada {item.season}</Text>
          )}
          {item.description && (
            <Text style={styles.trophyDescription} numberOfLines={2}>
              {item.description}
            </Text>
          )}
          <View style={styles.trophyFooter}>
            <View style={styles.trophyYearBadge}>
              <MaterialIcons name="calendar-today" size={16} color={Theme.colors.primary} />
              <Text style={styles.trophyYear}>{item.year}</Text>
            </View>
            <View style={styles.trophyCategoryBadge}>
              <MaterialIcons
                name={
                  item.category === 'club' ? 'groups' :
                  item.category === 'national' ? 'flag' :
                  item.category === 'individual' ? 'person' : 'child-care'
                }
                size={16}
                color={Theme.colors.textSecondary}
              />
              <Text style={styles.trophyCategory}>
                {categories.find(c => c.id === item.category)?.label}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderYearSection = ({ item }: { item: { year: number; trophies: Trophy[] } }) => (
    <View style={styles.yearSection}>
      <View style={styles.yearHeader}>
        <LinearGradient
          colors={Theme.colors.gradientPrimary}
          style={styles.yearBadge}
        >
          <Text style={styles.yearText}>{item.year}</Text>
        </LinearGradient>
        <Text style={styles.yearCount}>{item.trophies.length} troféu{item.trophies.length > 1 ? 's' : ''}</Text>
      </View>
      {item.trophies.map((trophy, index) => (
        <View key={trophy.id}>
          {renderTrophyItem({ item: trophy, index })}
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  const groupedTrophies = groupTrophiesByYear(trophies);
  const yearSections = Object.keys(groupedTrophies)
    .map(year => ({
      year: parseInt(year),
      trophies: groupedTrophies[parseInt(year)],
    }))
    .sort((a, b) => b.year - a.year);

  const totalTrophies = trophies.length;
  const majorTrophies = trophies.filter(t => t.is_major).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={Theme.colors.gradientDark}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={Theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Troféus</Text>
            <Text style={styles.headerSubtitle}>{legendName}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialIcons name="emoji-events" size={24} color="#FFD700" />
            <Text style={styles.statValue}>{totalTrophies}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="star" size={24} color="#FFD700" />
            <Text style={styles.statValue}>{majorTrophies}</Text>
            <Text style={styles.statLabel}>Principais</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id || 'all'}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <MaterialIcons
                name={category.icon as any}
                size={18}
                color={selectedCategory === category.id ? Theme.colors.text : Theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category.id && styles.categoryChipTextActive,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      <FlatList
        data={yearSections}
        renderItem={renderYearSection}
        keyExtractor={(item) => item.year.toString()}
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
            <MaterialIcons name="emoji-events" size={64} color={Theme.colors.textTertiary} />
            <Text style={styles.emptyText}>Nenhum troféu encontrado</Text>
            <Text style={styles.emptySubtext}>
              Os troféus desta lenda aparecerão aqui quando forem adicionados
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
    paddingBottom: Theme.spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    ...Theme.typography.h2,
    marginBottom: Theme.spacing.xs,
  },
  headerSubtitle: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.md,
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    alignItems: 'center',
  },
  statValue: {
    ...Theme.typography.h1,
    fontSize: 28,
    marginTop: Theme.spacing.xs,
  },
  statLabel: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.xs,
  },
  categoriesContainer: {
    marginBottom: Theme.spacing.sm,
  },
  categoriesContent: {
    paddingHorizontal: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: Theme.spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: Theme.colors.primary,
  },
  categoryChipText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.xs,
  },
  categoryChipTextActive: {
    color: Theme.colors.text,
    fontWeight: '600',
  },
  listContent: {
    padding: Theme.spacing.md,
  },
  yearSection: {
    marginBottom: Theme.spacing.xl,
  },
  yearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  yearBadge: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  yearText: {
    ...Theme.typography.h3,
    color: '#fff',
    fontWeight: '700',
  },
  yearCount: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
  },
  trophyCard: {
    backgroundColor: Theme.colors.backgroundCard,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    flexDirection: 'row',
    ...Theme.shadows.md,
  },
  trophyCardMajor: {
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
  },
  trophyImage: {
    width: 80,
    height: 80,
    borderRadius: Theme.borderRadius.md,
    marginRight: Theme.spacing.md,
    backgroundColor: Theme.colors.backgroundLight,
  },
  trophyContent: {
    flex: 1,
  },
  trophyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
    gap: Theme.spacing.xs,
  },
  trophyName: {
    ...Theme.typography.h3,
    flex: 1,
  },
  trophyCompetition: {
    ...Theme.typography.body,
    color: Theme.colors.primary,
    fontWeight: '600',
    marginBottom: Theme.spacing.xs,
  },
  trophySeason: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  trophyDescription: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
  },
  trophyFooter: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.xs,
  },
  trophyYearBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundLight,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
    gap: Theme.spacing.xs,
  },
  trophyYear: {
    ...Theme.typography.caption,
    fontWeight: '600',
  },
  trophyCategoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundLight,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
    gap: Theme.spacing.xs,
  },
  trophyCategory: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
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

