import React, { useState, useEffect } from 'react';
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
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { ImagePickerButton } from '@/components/ImagePickerButton';
import { GradientButton } from '@/components/GradientButton';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Legend } from '@/types';

export default function CreateStoryScreen() {
  const [loading, setLoading] = useState(false);
  const [legends, setLegends] = useState<Legend[]>([]);
  const [selectedLegend, setSelectedLegend] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    video_url: '',
    is_featured: false,
  });

  useEffect(() => {
    fetchLegends();
  }, []);

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

  const handleSave = async () => {
    if (!selectedLegend) {
      Alert.alert('Erro', 'Selecione uma lenda');
      return;
    }

    if (!formData.title) {
      Alert.alert('Erro', 'O título é obrigatório');
      return;
    }

    if (!formData.content) {
      Alert.alert('Erro', 'O conteúdo é obrigatório');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from('stories').insert([
        {
          legend_id: selectedLegend,
          title: formData.title,
          content: formData.content,
          image_url: formData.image_url || null,
          video_url: formData.video_url || null,
          is_featured: formData.is_featured,
          created_by: user?.id || null,
        },
      ]);

      if (error) throw error;
      Alert.alert('Sucesso', 'História criada com sucesso!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

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
        <Text style={styles.headerTitle}>Nova História</Text>
      </LinearGradient>

      <View style={styles.content}>
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
          placeholder="Título da história"
        />

        <Text style={styles.label}>Conteúdo *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.content}
          onChangeText={(text) => setFormData({ ...formData, content: text })}
          placeholder="Conteúdo da história"
          multiline
          numberOfLines={10}
        />

        <Text style={styles.label}>Imagem</Text>
        <ImagePickerButton
          onImageSelected={(uri) => setFormData({ ...formData, image_url: uri })}
          currentImageUrl={formData.image_url}
        />

        <Text style={styles.label}>URL do Vídeo</Text>
        <TextInput
          style={styles.input}
          value={formData.video_url}
          onChangeText={(text) => setFormData({ ...formData, video_url: text })}
          placeholder="https://..."
        />

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setFormData({ ...formData, is_featured: !formData.is_featured })}
        >
          <MaterialIcons
            name={formData.is_featured ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={formData.is_featured ? Theme.colors.primary : Theme.colors.textSecondary}
          />
          <Text style={styles.checkboxLabel}>História em Destaque</Text>
        </TouchableOpacity>

        <GradientButton
          title={loading ? 'Salvando...' : 'Salvar História'}
          onPress={handleSave}
          variant="football"
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    minHeight: 200,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  checkboxLabel: {
    ...Theme.typography.body,
  },
});

