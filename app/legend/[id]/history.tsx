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
import { CareerMilestone } from '@/types';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Linking } from 'react-native';

export default function HistoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [milestones, setMilestones] = useState<CareerMilestone[]>([]);
  const [legendName, setLegendName] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const milestoneTypes = [
    { id: null, label: 'Todos', icon: 'timeline' },
    { id: 'debut', label: 'Début', icon: 'play-arrow' },
    { id: 'transfer', label: 'Transferências', icon: 'swap-horiz' },
    { id: 'goal', label: 'Gols Marcantes', icon: 'sports-soccer' },
    { id: 'trophy', label: 'Troféus', icon: 'trophy' },
    { id: 'record', label: 'Recordes', icon: 'emoji-events' },
    { id: 'award', label: 'Prêmios', icon: 'star' },
    { id: 'retirement', label: 'Aposentadoria', icon: 'exit-to-app' },
  ];

  useEffect(() => {
    fetchLegendName();
    fetchMilestones();
  }, [id, selectedType]);

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

  const fetchMilestones = async () => {
    try {
      let query = supabase
        .from('career_milestones')
        .select('*')
        .eq('legend_id', id)
        .order('date', { ascending: false });

      if (selectedType) {
        query = query.eq('milestone_type', selectedType);
      }

      const { data, error } = await query;

      if (error) throw error;
      setMilestones(data || []);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMilestones();
  };

  const getMilestoneIcon = (type: string) => {
    const typeMap: { [key: string]: string } = {
      debut: 'play-arrow',
      transfer: 'swap-horiz',
      goal: 'sports-soccer',
      trophy: 'trophy',
      record: 'emoji-events',
      retirement: 'exit-to-app',
      award: 'star',
      injury: 'healing',
      comeback: 'refresh',
    };
    return typeMap[type] || 'event';
  };

  const getImportanceColor = (importance: string) => {
    const colorMap: { [key: string]: string } = {
      low: Theme.colors.textSecondary,
      normal: Theme.colors.primary,
      high: '#FFD700',
      legendary: '#FF6B6B',
    };
    return colorMap[importance] || Theme.colors.primary;
  };

  const renderMilestoneItem = ({ item, index }: { item: CareerMilestone; index: number }) => {
    const iconName = getMilestoneIcon(item.milestone_type);
    const importanceColor = getImportanceColor(item.importance);

    return (
      <Animated.View entering={FadeInDown.delay(index * 50)}>
        <View style={styles.milestoneCard}>
          <View style={styles.milestoneTimeline}>
            <View style={[styles.timelineDot, { backgroundColor: importanceColor }]}>
              <MaterialIcons name={iconName as any} size={20} color="#fff" />
            </View>
            {index < milestones.length - 1 && <View style={styles.timelineLine} />}
          </View>

          <View style={styles.milestoneContent}>
            <View style={styles.milestoneHeader}>
              <Text style={styles.milestoneDate}>
                {new Date(item.date).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
              {item.importance === 'legendary' && (
                <View style={styles.legendaryBadge}>
                  <MaterialIcons name="star" size={16} color="#FF6B6B" />
                  <Text style={styles.legendaryText}>Lendário</Text>
                </View>
              )}
            </View>

            <Text style={styles.milestoneTitle}>{item.title}</Text>
            <Text style={styles.milestoneDescription}>{item.description}</Text>

            {(item.club_name || item.competition_name) && (
              <View style={styles.milestoneInfo}>
                {item.club_name && (
                  <View style={styles.infoBadge}>
                    <MaterialIcons name="groups" size={16} color={Theme.colors.primary} />
                    <Text style={styles.infoText}>{item.club_name}</Text>
                  </View>
                )}
                {item.competition_name && (
                  <View style={styles.infoBadge}>
                    <MaterialIcons name="emoji-events" size={16} color={Theme.colors.primary} />
                    <Text style={styles.infoText}>{item.competition_name}</Text>
                  </View>
                )}
              </View>
            )}

            {item.image_url && (
              <Image source={{ uri: item.image_url }} style={styles.milestoneImage} />
            )}

            {item.video_url && (
              <TouchableOpacity
                style={styles.videoButton}
                onPress={() => Linking.openURL(item.video_url!)}
              >
                <MaterialIcons name="play-circle-filled" size={24} color={Theme.colors.primary} />
                <Text style={styles.videoButtonText}>Assistir Vídeo</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="light-content" />
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
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={Theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Histórico Completo</Text>
            <Text style={styles.headerSubtitle}>{legendName}</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {milestoneTypes.map((type) => (
            <TouchableOpacity
              key={type.id || 'all'}
              style={[
                styles.filterChip,
                selectedType === type.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <MaterialIcons
                name={type.icon as any}
                size={18}
                color={selectedType === type.id ? Theme.colors.text : Theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.filterChipText,
                  selectedType === type.id && styles.filterChipTextActive,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      <FlatList
        data={milestones}
        renderItem={renderMilestoneItem}
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
            <MaterialIcons name="timeline" size={64} color={Theme.colors.textTertiary} />
            <Text style={styles.emptyText}>Nenhum marco encontrado</Text>
            <Text style={styles.emptySubtext}>
              O histórico desta lenda aparecerá aqui quando for adicionado
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
  filtersContainer: {
    marginBottom: Theme.spacing.sm,
  },
  filtersContent: {
    paddingHorizontal: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: Theme.spacing.sm,
  },
  filterChipActive: {
    backgroundColor: Theme.colors.primary,
  },
  filterChipText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.xs,
  },
  filterChipTextActive: {
    color: Theme.colors.text,
    fontWeight: '600',
  },
  listContent: {
    padding: Theme.spacing.md,
  },
  milestoneCard: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.lg,
  },
  milestoneTimeline: {
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  timelineDot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.md,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Theme.colors.border,
    marginTop: Theme.spacing.xs,
    minHeight: 40,
  },
  milestoneContent: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundCard,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    ...Theme.shadows.md,
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  milestoneDate: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    fontWeight: '600',
  },
  legendaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
    gap: Theme.spacing.xs,
  },
  legendaryText: {
    ...Theme.typography.caption,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  milestoneTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  milestoneDescription: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
    lineHeight: 22,
  },
  milestoneInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundLight,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
    gap: Theme.spacing.xs,
  },
  infoText: {
    ...Theme.typography.caption,
    fontWeight: '600',
  },
  milestoneImage: {
    width: '100%',
    height: 200,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
    backgroundColor: Theme.colors.backgroundLight,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundLight,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    gap: Theme.spacing.sm,
  },
  videoButtonText: {
    ...Theme.typography.body,
    color: Theme.colors.primary,
    fontWeight: '600',
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

