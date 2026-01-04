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
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Legend } from '@/types';

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
        birth_date: legend.birth_date ? new Date(legend.birth_date).toISOString().split('T')[0] : '',
        biography: legend.biography || '',
        achievements: legend.achievements || '',
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

    setSaving(true);
    try {
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
          achievements: formData.achievements || null,
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
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nome *</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Ex: Pelé"
        />

        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={formData.full_name}
          onChangeText={(text) => setFormData({ ...formData, full_name: text })}
          placeholder="Ex: Edson Arantes do Nascimento"
        />

        <Text style={styles.label}>Nacionalidade *</Text>
        <TextInput
          style={styles.input}
          value={formData.nationality}
          onChangeText={(text) => setFormData({ ...formData, nationality: text })}
          placeholder="Ex: Brasileiro"
        />

        <Text style={styles.label}>Posição *</Text>
        <TextInput
          style={styles.input}
          value={formData.position}
          onChangeText={(text) => setFormData({ ...formData, position: text })}
          placeholder="Ex: Atacante"
        />

        <Text style={styles.label}>Clube Atual</Text>
        <TextInput
          style={styles.input}
          value={formData.current_club}
          onChangeText={(text) => setFormData({ ...formData, current_club: text })}
          placeholder="Ex: Santos FC"
        />

        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          value={formData.birth_date}
          onChangeText={(text) => setFormData({ ...formData, birth_date: text })}
          placeholder="Ex: 23/10/1940"
        />

        <Text style={styles.label}>Biografia *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.biography}
          onChangeText={(text) => setFormData({ ...formData, biography: text })}
          placeholder="Escreva a biografia da lenda..."
          multiline
          numberOfLines={6}
        />

        <Text style={styles.label}>Conquistas (uma por linha)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.achievements}
          onChangeText={(text) => setFormData({ ...formData, achievements: text })}
          placeholder="Ex: 3 Copas do Mundo&#10;1000 gols&#10;Campeão Mundial"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>URL da Imagem</Text>
        <TextInput
          style={styles.input}
          value={formData.image_url}
          onChangeText={(text) => setFormData({ ...formData, image_url: text })}
          placeholder="https://..."
          autoCapitalize="none"
        />


        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

