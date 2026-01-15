import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Legend } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCard } from '@/components/AnimatedCard';
import { getPlayerImageUrl } from '@/utils/imageUtils';

export default function CompareScreen() {
  const [legends, setLegends] = useState<Legend[]>([]);
  const [selectedLegends, setSelectedLegends] = useState<Legend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLegends();
  }, []);

  const fetchLegends = async () => {
    try {
      const { data, error } = await supabase
        .from('legends')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (error) throw error;
      setLegends(data || []);
    } catch (error) {
      console.error('Error fetching legends:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLegend = (legend: Legend) => {
    if (selectedLegends.find(l => l.id === legend.id)) {
      setSelectedLegends(selectedLegends.filter(l => l.id !== legend.id));
    } else if (selectedLegends.length < 2) {
      setSelectedLegends([...selectedLegends, legend]);
    }
  };

  const clearSelection = () => {
    setSelectedLegends([]);
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
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={Theme.colors.gradientDark}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comparar Lendas</Text>
        <Text style={styles.headerSubtitle}>
          Selecione até 2 lendas para comparar
        </Text>
        {selectedLegends.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
            <MaterialIcons name="clear" size={18} color={Theme.colors.text} />
            <Text style={styles.clearButtonText}>Limpar seleção</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>

      <View style={styles.content}>
        {selectedLegends.length === 2 && (
          <AnimatedCard delay={50} style={styles.comparisonCard}>
            <Text style={styles.comparisonTitle}>Comparação</Text>
            <View style={styles.comparisonContent}>
              {selectedLegends.map((legend, index) => (
                <View key={legend.id} style={styles.legendColumn}>
                  <Image
                    source={{ uri: legend.image_url || getPlayerImageUrl(legend.name) }}
                    style={styles.comparisonImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.comparisonName}>{legend.name}</Text>
                  <View style={styles.comparisonDetails}>
                    <View style={styles.detailRow}>
                      <MaterialIcons name="flag" size={16} color={Theme.colors.textSecondary} />
                      <Text style={styles.detailText}>{legend.nationality || 'N/A'}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <MaterialIcons name="sports-soccer" size={16} color={Theme.colors.textSecondary} />
                      <Text style={styles.detailText}>{legend.position || 'N/A'}</Text>
                    </View>
                    {legend.current_club && (
                      <View style={styles.detailRow}>
                        <MaterialIcons name="group" size={16} color={Theme.colors.textSecondary} />
                        <Text style={styles.detailText}>{legend.current_club}</Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => router.push(`/legend/${legend.id}`)}
                  >
                    <Text style={styles.viewButtonText}>Ver Detalhes</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </AnimatedCard>
        )}

        <Text style={styles.sectionTitle}>
          {selectedLegends.length === 0
            ? 'Selecione as lendas para comparar'
            : selectedLegends.length === 1
            ? 'Selecione mais uma lenda'
            : 'Selecione outras lendas'}
        </Text>

        <View style={styles.legendsGrid}>
          {legends.map((legend, index) => {
            const isSelected = selectedLegends.find(l => l.id === legend.id) !== undefined;
            const isDisabled = selectedLegends.length >= 2 && !isSelected;

            return (
              <AnimatedCard key={legend.id} delay={100 + index * 30}>
                <TouchableOpacity
                  style={[
                    styles.legendCard,
                    isSelected && styles.legendCardSelected,
                    isDisabled && styles.legendCardDisabled,
                  ]}
                  onPress={() => toggleLegend(legend)}
                  disabled={isDisabled}
                >
                  <Image
                    source={{ uri: legend.image_url || getPlayerImageUrl(legend.name) }}
                    style={styles.legendImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.legendName} numberOfLines={1}>
                    {legend.name}
                  </Text>
                  {isSelected && (
                    <View style={styles.selectedBadge}>
                      <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                    </View>
                  )}
                </TouchableOpacity>
              </AnimatedCard>
            );
          })}
        </View>
      </View>
    </ScrollView>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  headerTitle: {
    ...Theme.typography.h1,
    fontSize: 28,
    marginBottom: Theme.spacing.xs,
  },
  headerSubtitle: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    gap: Theme.spacing.xs,
  },
  clearButtonText: {
    ...Theme.typography.body,
    fontWeight: '600',
  },
  content: {
    padding: Theme.spacing.md,
  },
  comparisonCard: {
    marginBottom: Theme.spacing.xl,
  },
  comparisonTitle: {
    ...Theme.typography.h2,
    marginBottom: Theme.spacing.lg,
    textAlign: 'center',
  },
  comparisonContent: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  legendColumn: {
    flex: 1,
    alignItems: 'center',
  },
  comparisonImage: {
    width: '100%',
    height: 200,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
  },
  comparisonName: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.md,
    textAlign: 'center',
  },
  comparisonDetails: {
    width: '100%',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  detailText: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
  },
  viewButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    marginTop: Theme.spacing.sm,
  },
  viewButtonText: {
    ...Theme.typography.body,
    color: '#fff',
    fontWeight: '600',
  },
  sectionTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.md,
  },
  legendsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  legendCard: {
    width: '47%',
    position: 'relative',
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: Theme.colors.backgroundLight,
  },
  legendCardSelected: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  legendCardDisabled: {
    opacity: 0.5,
  },
  legendImage: {
    width: '100%',
    height: 150,
    backgroundColor: Theme.colors.backgroundLight,
  },
  legendName: {
    ...Theme.typography.body,
    padding: Theme.spacing.sm,
    textAlign: 'center',
    fontWeight: '600',
  },
  selectedBadge: {
    position: 'absolute',
    top: Theme.spacing.xs,
    right: Theme.spacing.xs,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
});

