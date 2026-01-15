import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Trophy, Legend } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '@/components/GradientButton';
import { AnimatedCard } from '@/components/AnimatedCard';

export default function AdminTrophiesScreen() {
  const { profile } = useAuth();
  const [trophies, setTrophies] = useState<(Trophy & { legend?: Legend })[]>([]);
  const [legends, setLegends] = useState<Legend[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTrophy, setEditingTrophy] = useState<Trophy | null>(null);
  const [selectedLegend, setSelectedLegend] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    competition: '',
    year: '',
    season: '',
    description: '',
    image_url: '',
    category: 'club' as Trophy['category'],
    is_major: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      if (profile?.is_admin) {
        fetchTrophies();
        fetchLegends();
      }
    }, [profile])
  );

  const fetchLegends = async () => {
    try {
      const { data } = await supabase
        .from('legends')
        .select('id, name')
        .eq('is_active', true)
        .order('name');
      setLegends(data || []);
    } catch (error) {
      console.error('Error fetching legends:', error);
    }
  };

  const fetchTrophies = async () => {
    try {
      const { data, error } = await supabase
        .from('trophies')
        .select('*, legend:legends(id, name)')
        .order('year', { ascending: false });

      if (error) throw error;
      setTrophies(data || []);
    } catch (error) {
      console.error('Error fetching trophies:', error);
      Alert.alert('Erro', 'Não foi possível carregar os troféus');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTrophies();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      competition: '',
      year: '',
      season: '',
      description: '',
      image_url: '',
      category: 'club',
      is_major: false,
    });
    setSelectedLegend('');
    setEditingTrophy(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!selectedLegend || !formData.name || !formData.competition || !formData.year) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const trophyData = {
        legend_id: selectedLegend,
        name: formData.name,
        competition: formData.competition,
        year: parseInt(formData.year),
        season: formData.season || null,
        description: formData.description || null,
        image_url: formData.image_url || null,
        category: formData.category,
        is_major: formData.is_major,
      };

      if (editingTrophy) {
        const { error } = await supabase
          .from('trophies')
          .update(trophyData)
          .eq('id', editingTrophy.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('trophies').insert([trophyData]);
        if (error) throw error;
      }

      resetForm();
      fetchTrophies();
      Alert.alert('Sucesso', editingTrophy ? 'Troféu atualizado!' : 'Troféu adicionado!');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleEdit = (trophy: Trophy) => {
    setEditingTrophy(trophy);
    setFormData({
      name: trophy.name,
      competition: trophy.competition,
      year: trophy.year.toString(),
      season: trophy.season || '',
      description: trophy.description || '',
      image_url: trophy.image_url || '',
      category: trophy.category,
      is_major: trophy.is_major,
    });
    setSelectedLegend(trophy.legend_id);
    setShowForm(true);
  };

  const handleDelete = (trophy: Trophy) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir ${trophy.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('trophies')
                .delete()
                .eq('id', trophy.id);
              if (error) throw error;
              fetchTrophies();
            } catch (error: any) {
              Alert.alert('Erro', error.message);
            }
          },
        },
      ]
    );
  };

  const renderTrophyItem = ({ item, index }: { item: Trophy & { legend?: Legend }; index: number }) => (
    <AnimatedCard delay={index * 50} style={styles.trophyCard}>
      <View style={styles.trophyContent}>
        <View style={styles.trophyHeader}>
          <View style={styles.trophyInfo}>
            <Text style={styles.trophyName}>{item.name}</Text>
            <Text style={styles.trophyDetails}>
              {item.competition} • {item.year}
            </Text>
            {item.legend && (
              <Text style={styles.legendName}>{item.legend.name}</Text>
            )}
          </View>
          {item.is_major && (
            <MaterialIcons name="star" size={24} color="#FFD700" />
          )}
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEdit(item)}
          >
            <MaterialIcons name="edit" size={20} color={Theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDelete(item)}
          >
            <MaterialIcons name="delete" size={20} color={Theme.colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedCard>
  );

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
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gerenciar Troféus</Text>
        <Text style={styles.headerSubtitle}>{trophies.length} troféu{trophies.length !== 1 ? 's' : ''}</Text>
      </LinearGradient>

      {!showForm ? (
        <>
          <View style={styles.actionsContainer}>
            <GradientButton
              title="Adicionar Troféu"
              onPress={() => setShowForm(true)}
              variant="football"
            />
          </View>

          <FlatList
            data={trophies}
            renderItem={renderTrophyItem}
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
                <MaterialIcons name="emoji-events" size={64} color={Theme.colors.textTertiary} />
                <Text style={styles.emptyText}>Nenhum troféu cadastrado</Text>
              </View>
            }
          />
        </>
      ) : (
        <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent}>
          <Text style={styles.formTitle}>
            {editingTrophy ? 'Editar Troféu' : 'Novo Troféu'}
          </Text>

          <Text style={styles.label}>Lenda *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.legendSelector}>
            {legends.map((legend) => (
              <TouchableOpacity
                key={legend.id}
                style={[
                  styles.legendChip,
                  selectedLegend === legend.id && styles.legendChipSelected,
                ]}
                onPress={() => setSelectedLegend(legend.id)}
              >
                <Text
                  style={[
                    styles.legendChipText,
                    selectedLegend === legend.id && styles.legendChipTextSelected,
                  ]}
                >
                  {legend.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.label}>Nome do Troféu *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Ex: Copa do Mundo FIFA"
          />

          <Text style={styles.label}>Competição *</Text>
          <TextInput
            style={styles.input}
            value={formData.competition}
            onChangeText={(text) => setFormData({ ...formData, competition: text })}
            placeholder="Ex: Copa do Mundo"
          />

          <Text style={styles.label}>Ano *</Text>
          <TextInput
            style={styles.input}
            value={formData.year}
            onChangeText={(text) => setFormData({ ...formData, year: text })}
            placeholder="Ex: 1970"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Temporada</Text>
          <TextInput
            style={styles.input}
            value={formData.season}
            onChangeText={(text) => setFormData({ ...formData, season: text })}
            placeholder="Ex: 2022/2023"
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Descrição do troféu"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>URL da Imagem</Text>
          <TextInput
            style={styles.input}
            value={formData.image_url}
            onChangeText={(text) => setFormData({ ...formData, image_url: text })}
            placeholder="https://..."
          />

          <Text style={styles.label}>Categoria</Text>
          <View style={styles.categoryContainer}>
            {(['club', 'national', 'individual', 'youth'] as Trophy['category'][]).map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  formData.category === cat && styles.categoryChipSelected,
                ]}
                onPress={() => setFormData({ ...formData, category: cat })}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    formData.category === cat && styles.categoryChipTextSelected,
                  ]}
                >
                  {cat === 'club' ? 'Clube' : cat === 'national' ? 'Seleção' : cat === 'individual' ? 'Individual' : 'Base'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setFormData({ ...formData, is_major: !formData.is_major })}
          >
            <MaterialIcons
              name={formData.is_major ? 'check-box' : 'check-box-outline-blank'}
              size={24}
              color={formData.is_major ? Theme.colors.primary : Theme.colors.textSecondary}
            />
            <Text style={styles.checkboxLabel}>Troféu Principal</Text>
          </TouchableOpacity>

          <View style={styles.formActions}>
            <GradientButton
              title={editingTrophy ? 'Atualizar' : 'Salvar'}
              onPress={handleSave}
              variant="football"
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={resetForm}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
  },
  actionsContainer: {
    padding: Theme.spacing.md,
  },
  listContent: {
    padding: Theme.spacing.md,
  },
  trophyCard: {
    marginBottom: Theme.spacing.md,
  },
  trophyContent: {
    padding: Theme.spacing.md,
  },
  trophyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  trophyInfo: {
    flex: 1,
  },
  trophyName: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  trophyDetails: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  legendName: {
    ...Theme.typography.caption,
    color: Theme.colors.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
  },
  actionButton: {
    padding: Theme.spacing.sm,
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
    color: Theme.colors.textSecondary,
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    padding: Theme.spacing.md,
  },
  formTitle: {
    ...Theme.typography.h2,
    marginBottom: Theme.spacing.lg,
  },
  label: {
    ...Theme.typography.body,
    fontWeight: '600',
    marginBottom: Theme.spacing.xs,
    marginTop: Theme.spacing.md,
  },
  input: {
    backgroundColor: Theme.colors.backgroundCard,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    ...Theme.typography.body,
    marginBottom: Theme.spacing.sm,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  legendSelector: {
    marginBottom: Theme.spacing.md,
  },
  legendChip: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.backgroundCard,
    marginRight: Theme.spacing.sm,
  },
  legendChipSelected: {
    backgroundColor: Theme.colors.primary,
  },
  legendChipText: {
    ...Theme.typography.body,
    color: Theme.colors.text,
  },
  legendChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  categoryChip: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.backgroundCard,
  },
  categoryChipSelected: {
    backgroundColor: Theme.colors.primary,
  },
  categoryChipText: {
    ...Theme.typography.body,
    color: Theme.colors.text,
  },
  categoryChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  checkboxLabel: {
    ...Theme.typography.body,
  },
  formActions: {
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
  },
  cancelButton: {
    padding: Theme.spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    ...Theme.typography.body,
    color: Theme.colors.error,
    fontWeight: '600',
  },
});

