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
import { CareerMilestone, Legend } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '@/components/GradientButton';
import { AnimatedCard } from '@/components/AnimatedCard';

export default function AdminCareerMilestonesScreen() {
  const { profile } = useAuth();
  const [milestones, setMilestones] = useState<(CareerMilestone & { legend?: Legend })[]>([]);
  const [legends, setLegends] = useState<Legend[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<CareerMilestone | null>(null);
  const [selectedLegend, setSelectedLegend] = useState<string>('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    milestone_type: 'debut' as CareerMilestone['milestone_type'],
    importance: 'normal' as CareerMilestone['importance'],
    image_url: '',
    video_url: '',
    club_name: '',
    competition_name: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      if (profile?.is_admin) {
        fetchMilestones();
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

  const fetchMilestones = async () => {
    try {
      const { data, error } = await supabase
        .from('career_milestones')
        .select('*, legend:legends(id, name)')
        .order('date', { ascending: false });

      if (error) throw error;
      setMilestones(data || []);
    } catch (error) {
      console.error('Error fetching milestones:', error);
      Alert.alert('Erro', 'Não foi possível carregar os marcos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMilestones();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      milestone_type: 'debut',
      importance: 'normal',
      image_url: '',
      video_url: '',
      club_name: '',
      competition_name: '',
    });
    setSelectedLegend('');
    setEditingMilestone(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!selectedLegend || !formData.title || !formData.description || !formData.date) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const milestoneData = {
        legend_id: selectedLegend,
        title: formData.title,
        description: formData.description,
        date: formData.date,
        milestone_type: formData.milestone_type,
        importance: formData.importance,
        image_url: formData.image_url || null,
        video_url: formData.video_url || null,
        club_name: formData.club_name || null,
        competition_name: formData.competition_name || null,
      };

      if (editingMilestone) {
        const { error } = await supabase
          .from('career_milestones')
          .update(milestoneData)
          .eq('id', editingMilestone.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('career_milestones').insert([milestoneData]);
        if (error) throw error;
      }

      resetForm();
      fetchMilestones();
      Alert.alert('Sucesso', editingMilestone ? 'Marco atualizado!' : 'Marco adicionado!');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleEdit = (milestone: CareerMilestone) => {
    setEditingMilestone(milestone);
    setFormData({
      title: milestone.title,
      description: milestone.description,
      date: milestone.date,
      milestone_type: milestone.milestone_type,
      importance: milestone.importance,
      image_url: milestone.image_url || '',
      video_url: milestone.video_url || '',
      club_name: milestone.club_name || '',
      competition_name: milestone.competition_name || '',
    });
    setSelectedLegend(milestone.legend_id);
    setShowForm(true);
  };

  const handleDelete = (milestone: CareerMilestone) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir ${milestone.title}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('career_milestones')
                .delete()
                .eq('id', milestone.id);
              if (error) throw error;
              fetchMilestones();
            } catch (error: any) {
              Alert.alert('Erro', error.message);
            }
          },
        },
      ]
    );
  };

  const renderMilestoneItem = ({ item, index }: { item: CareerMilestone & { legend?: Legend }; index: number }) => (
    <AnimatedCard delay={index * 50} style={styles.milestoneCard}>
      <View style={styles.milestoneContent}>
        <View style={styles.milestoneHeader}>
          <View style={styles.milestoneInfo}>
            <Text style={styles.milestoneTitle}>{item.title}</Text>
            <Text style={styles.milestoneDate}>
              {new Date(item.date).toLocaleDateString('pt-BR')}
            </Text>
            {item.legend && (
              <Text style={styles.legendName}>{item.legend.name}</Text>
            )}
            <View style={styles.badges}>
              <View style={styles.typeBadge}>
                <Text style={styles.badgeText}>{item.milestone_type}</Text>
              </View>
              {item.importance === 'legendary' && (
                <View style={styles.importanceBadge}>
                  <MaterialIcons name="star" size={16} color="#FF6B6B" />
                  <Text style={styles.importanceText}>Lendário</Text>
                </View>
              )}
            </View>
          </View>
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
        <Text style={styles.headerTitle}>Gerenciar Marcos</Text>
        <Text style={styles.headerSubtitle}>{milestones.length} marco{milestones.length !== 1 ? 's' : ''}</Text>
      </LinearGradient>

      {!showForm ? (
        <>
          <View style={styles.actionsContainer}>
            <GradientButton
              title="Adicionar Marco"
              onPress={() => setShowForm(true)}
              variant="football"
            />
          </View>

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
                <Text style={styles.emptyText}>Nenhum marco cadastrado</Text>
              </View>
            }
          />
        </>
      ) : (
        <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent}>
          <Text style={styles.formTitle}>
            {editingMilestone ? 'Editar Marco' : 'Novo Marco'}
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

          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            placeholder="Ex: Début Profissional"
          />

          <Text style={styles.label}>Descrição *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Descrição do marco"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Data *</Text>
          <TextInput
            style={styles.input}
            value={formData.date}
            onChangeText={(text) => setFormData({ ...formData, date: text })}
            placeholder="YYYY-MM-DD (Ex: 1956-09-07)"
          />

          <Text style={styles.label}>Tipo *</Text>
          <View style={styles.categoryContainer}>
            {(['debut', 'transfer', 'goal', 'trophy', 'record', 'retirement', 'award', 'injury', 'comeback'] as CareerMilestone['milestone_type'][]).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.categoryChip,
                  formData.milestone_type === type && styles.categoryChipSelected,
                ]}
                onPress={() => setFormData({ ...formData, milestone_type: type })}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    formData.milestone_type === type && styles.categoryChipTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Importância</Text>
          <View style={styles.categoryContainer}>
            {(['low', 'normal', 'high', 'legendary'] as CareerMilestone['importance'][]).map((imp) => (
              <TouchableOpacity
                key={imp}
                style={[
                  styles.categoryChip,
                  formData.importance === imp && styles.categoryChipSelected,
                ]}
                onPress={() => setFormData({ ...formData, importance: imp })}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    formData.importance === imp && styles.categoryChipTextSelected,
                  ]}
                >
                  {imp === 'low' ? 'Baixa' : imp === 'normal' ? 'Normal' : imp === 'high' ? 'Alta' : 'Lendária'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Nome do Clube</Text>
          <TextInput
            style={styles.input}
            value={formData.club_name}
            onChangeText={(text) => setFormData({ ...formData, club_name: text })}
            placeholder="Ex: Santos FC"
          />

          <Text style={styles.label}>Nome da Competição</Text>
          <TextInput
            style={styles.input}
            value={formData.competition_name}
            onChangeText={(text) => setFormData({ ...formData, competition_name: text })}
            placeholder="Ex: Copa do Mundo"
          />

          <Text style={styles.label}>URL da Imagem</Text>
          <TextInput
            style={styles.input}
            value={formData.image_url}
            onChangeText={(text) => setFormData({ ...formData, image_url: text })}
            placeholder="https://..."
          />

          <Text style={styles.label}>URL do Vídeo</Text>
          <TextInput
            style={styles.input}
            value={formData.video_url}
            onChangeText={(text) => setFormData({ ...formData, video_url: text })}
            placeholder="https://..."
          />

          <View style={styles.formActions}>
            <GradientButton
              title={editingMilestone ? 'Atualizar' : 'Salvar'}
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
  milestoneCard: {
    marginBottom: Theme.spacing.md,
  },
  milestoneContent: {
    padding: Theme.spacing.md,
  },
  milestoneHeader: {
    marginBottom: Theme.spacing.sm,
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.xs,
  },
  milestoneDate: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  legendName: {
    ...Theme.typography.caption,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  badges: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginTop: Theme.spacing.xs,
  },
  typeBadge: {
    backgroundColor: Theme.colors.backgroundLight,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  badgeText: {
    ...Theme.typography.caption,
    textTransform: 'capitalize',
  },
  importanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
    gap: Theme.spacing.xs,
  },
  importanceText: {
    ...Theme.typography.caption,
    color: '#FF6B6B',
    fontWeight: '600',
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
    textTransform: 'capitalize',
  },
  categoryChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
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

