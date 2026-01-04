import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Legend } from '@/types';
import { ImagePickerButton } from '@/components/ImagePickerButton';
import { GradientButton } from '@/components/GradientButton';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { AnimatedCard } from '@/components/AnimatedCard';

export default function EditLegendScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    full_name: '',
    nationality: '',
    position: '',
    current_club: '',
    birth_date: '',
    biography: '',
    achievements: '',
    image_url: '',
  });

  useEffect(() => {
    fetchLegend();
  }, [id]);

  const fetchLegend = async () => {
    try {
      const { data, error } = await supabase
        .from('legends')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      const legend = data as Legend;
      setFormData({
        name: legend.name || '',
        full_name: legend.full_name || '',
        nationality: legend.nationality || '',
        position: legend.position || '',
        current_club: legend.current_club || '',
        birth_date: legend.birth_date || '',
        biography: legend.biography || '',
        achievements: Array.isArray(legend.achievements)
          ? legend.achievements.join('\n')
          : legend.achievements || '',
        image_url: legend.image_url || '',
      });
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível carregar a lenda');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name) {
      Alert.alert('Erro', 'O nome é obrigatório');
      return;
    }

    if (!formData.nationality) {
      Alert.alert('Erro', 'A nacionalidade é obrigatória');
      return;
    }

    if (!formData.position) {
      Alert.alert('Erro', 'A posição é obrigatória');
      return;
    }

    if (!formData.biography) {
      Alert.alert('Erro', 'A biografia é obrigatória');
      return;
    }

    setSaving(true);
    try {
      const achievementsArray = formData.achievements
        .split('\n')
        .filter((a) => a.trim())
        .map((a) => a.trim());

      const { error } = await supabase
        .from('legends')
        .update({
          name: formData.name,
          full_name: formData.full_name || null,
          nationality: formData.nationality || null,
          position: formData.position || null,
          current_club: formData.current_club || null,
          birth_date: formData.birth_date || null,
          biography: formData.biography || null,
          achievements: achievementsArray.length > 0 ? achievementsArray : null,
          image_url: formData.image_url || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
      Alert.alert('Sucesso', 'Lenda atualizada com sucesso!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setSaving(false);
    }
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
        <Text style={styles.headerTitle}>Editar Lenda</Text>
      </LinearGradient>

      <View style={styles.content}>
        <AnimatedCard delay={50}>
          <ImagePickerButton
            value={formData.image_url}
            onChange={(url) => setFormData({ ...formData, image_url: url || '' })}
            label="Foto da Lenda"
            folder="legends"
          />
        </AnimatedCard>

        <AnimatedCard delay={100}>
          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Ex: Pelé"
            placeholderTextColor={Theme.colors.textTertiary}
          />
        </AnimatedCard>

        <AnimatedCard delay={150}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            value={formData.full_name}
            onChangeText={(text) => setFormData({ ...formData, full_name: text })}
            placeholder="Ex: Edson Arantes do Nascimento"
            placeholderTextColor={Theme.colors.textTertiary}
          />
        </AnimatedCard>

        <AnimatedCard delay={200}>
          <Text style={styles.label}>Nacionalidade *</Text>
          <TextInput
            style={styles.input}
            value={formData.nationality}
            onChangeText={(text) => setFormData({ ...formData, nationality: text })}
            placeholder="Ex: Brasileiro"
            placeholderTextColor={Theme.colors.textTertiary}
          />
        </AnimatedCard>

        <AnimatedCard delay={250}>
          <Text style={styles.label}>Posição *</Text>
          <TextInput
            style={styles.input}
            value={formData.position}
            onChangeText={(text) => setFormData({ ...formData, position: text })}
            placeholder="Ex: Atacante"
            placeholderTextColor={Theme.colors.textTertiary}
          />
        </AnimatedCard>

        <AnimatedCard delay={300}>
          <Text style={styles.label}>Clube Atual</Text>
          <TextInput
            style={styles.input}
            value={formData.current_club}
            onChangeText={(text) => setFormData({ ...formData, current_club: text })}
            placeholder="Ex: Santos FC"
            placeholderTextColor={Theme.colors.textTertiary}
          />
        </AnimatedCard>

        <AnimatedCard delay={350}>
          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            value={formData.birth_date}
            onChangeText={(text) => setFormData({ ...formData, birth_date: text })}
            placeholder="Ex: 23/10/1940"
            placeholderTextColor={Theme.colors.textTertiary}
          />
        </AnimatedCard>

        <AnimatedCard delay={400}>
          <Text style={styles.label}>Biografia *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.biography}
            onChangeText={(text) => setFormData({ ...formData, biography: text })}
            placeholder="Escreva a biografia da lenda..."
            placeholderTextColor={Theme.colors.textTertiary}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </AnimatedCard>

        <AnimatedCard delay={450}>
          <Text style={styles.label}>Conquistas (uma por linha)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.achievements}
            onChangeText={(text) => setFormData({ ...formData, achievements: text })}
            placeholder="Ex: 3 Copas do Mundo&#10;1000 gols&#10;Campeão Mundial"
            placeholderTextColor={Theme.colors.textTertiary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </AnimatedCard>

        <AnimatedCard delay={500}>
          <GradientButton
            title={saving ? 'Salvando...' : 'Salvar Alterações'}
            onPress={handleSave}
            loading={saving}
            variant="football"
          />
        </AnimatedCard>
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
  },
  content: {
    padding: Theme.spacing.md,
  },
  label: {
    ...Theme.typography.body,
    fontWeight: '600',
    marginBottom: Theme.spacing.sm,
  },
  input: {
    backgroundColor: Theme.colors.backgroundLight,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: 16,
    color: Theme.colors.text,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  textArea: {
    minHeight: 120,
    paddingTop: Theme.spacing.md,
  },
});
