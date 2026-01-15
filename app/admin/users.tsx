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
  Modal,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { User } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCard } from '@/components/AnimatedCard';
import { GradientButton } from '@/components/GradientButton';

export default function AdminUsersScreen() {
  const { profile, signUp, signOut } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    isAdmin: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      if (profile?.is_admin) {
        fetchUsers();
      }
    }, [profile])
  );

  const fetchUsers = async () => {
    try {
      console.log('Fetching users...');
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
      
      console.log(`Fetched ${data?.length || 0} users`);
      setUsers(data || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      Alert.alert(
        'Erro', 
        error.message || 'Não foi possível carregar os usuários. Verifique se as políticas RLS estão configuradas corretamente.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  const toggleAdminStatus = async (user: User) => {
    Alert.alert(
      'Confirmar alteração',
      `Deseja ${user.is_admin ? 'remover' : 'conceder'} privilégios de administrador para ${user.full_name || user.email}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('profiles')
                .update({ is_admin: !user.is_admin })
                .eq('id', user.id);

              if (error) throw error;
              fetchUsers();
              Alert.alert('Sucesso', 'Status de administrador atualizado!');
            } catch (error: any) {
              Alert.alert('Erro', error.message);
            }
          },
        },
      ]
    );
  };

  const deleteUser = (user: User) => {
    if (user.id === profile?.id) {
      Alert.alert('Erro', 'Você não pode excluir sua própria conta');
      return;
    }

    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir o usuário ${user.full_name || user.email}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', user.id);

              if (error) throw error;
              fetchUsers();
              Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
            } catch (error: any) {
              Alert.alert('Erro', error.message);
            }
          },
        },
      ]
    );
  };

  const handleCreateUser = async () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setCreating(true);
    try {
      // Salvar o ID do usuário atual antes de criar
      const currentUserId = profile?.id;
      
      // Criar o usuário usando a API do Supabase diretamente
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name || null,
          },
          emailRedirectTo: undefined,
        },
      });

      if (authError) {
        let errorMessage = authError.message;
        if (authError.message.includes('User already registered')) {
          errorMessage = 'Este email já está cadastrado';
        }
        throw new Error(errorMessage);
      }

      // Se o signUp criou uma sessão (o que acontece quando email confirmation está desabilitado),
      // precisamos fazer logout imediatamente para não manter a sessão do novo usuário
      if (authData.session && authData.user) {
        // Fazer logout do novo usuário criado
        await supabase.auth.signOut();
        
        // Nota: Infelizmente, isso também desloga o admin atual
        // Uma solução ideal seria usar uma Edge Function no Supabase que cria o usuário
        // sem fazer login, mas isso requer configuração adicional no Supabase
        // Por enquanto, avisamos o admin que ele precisa fazer login novamente
        Alert.alert(
          'Usuário Criado',
          'Usuário criado com sucesso!\n\nPor segurança, você foi deslogado. Por favor, faça login novamente com sua conta de administrador.',
          [
            {
              text: 'OK',
              onPress: () => {
                // O AuthContext vai detectar que não há sessão e redirecionar para login
              }
            }
          ]
        );
        
        // Limpar formulário e fechar modal
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
          isAdmin: false,
        });
        setShowCreateModal(false);
        fetchUsers();
        setCreating(false);
        return;
      }

      // Aguardar um pouco para o perfil ser criado pelo trigger
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Buscar o usuário recém-criado para obter o ID
      const { data: newUser, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', formData.email)
        .single();

      if (fetchError) {
        throw new Error('Não foi possível encontrar o usuário criado');
      }

      // Se o usuário deve ser admin, atualizar o perfil
      if (formData.isAdmin && newUser) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ is_admin: true })
          .eq('id', newUser.id);

        if (updateError) {
          console.error('Erro ao definir como admin:', updateError);
          Alert.alert('Aviso', 'Usuário criado, mas não foi possível definir como administrador');
        }
      }

      // Limpar formulário e fechar modal
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        isAdmin: false,
      });
      setShowCreateModal(false);
      
      // Atualizar lista de usuários
      fetchUsers();
      
      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      Alert.alert('Erro', error.message || 'Não foi possível criar o usuário');
    } finally {
      setCreating(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.email?.toLowerCase().includes(query) ||
      user.full_name?.toLowerCase().includes(query) ||
      user.name?.toLowerCase().includes(query)
    );
  });

  const renderUserItem = ({ item, index }: { item: User; index: number }) => {
    const isCurrentUser = item.id === profile?.id;
    
    return (
      <AnimatedCard delay={index * 50} style={styles.userCard}>
        <View style={styles.cardContent}>
          <View style={styles.userInfo}>
            <View style={styles.userHeader}>
              <Text style={styles.userName}>
                {item.full_name || item.name || item.email || 'Usuário'}
              </Text>
              {item.is_admin && (
                <View style={styles.adminBadge}>
                  <MaterialIcons name="admin-panel-settings" size={16} color="#FFD700" />
                  <Text style={styles.adminText}>Admin</Text>
                </View>
              )}
            </View>
            <Text style={styles.userEmail}>{item.email}</Text>
            {item.bio && (
              <Text style={styles.userBio} numberOfLines={2}>
                {item.bio}
              </Text>
            )}
            <Text style={styles.userDate}>
              Cadastrado em: {new Date(item.created_at).toLocaleDateString('pt-BR')}
            </Text>
          </View>
          {!isCurrentUser && (
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleAdminStatus(item)}
              >
                <MaterialIcons
                  name={item.is_admin ? 'admin-panel-settings' : 'person'}
                  size={20}
                  color={item.is_admin ? '#FFD700' : Theme.colors.textSecondary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => deleteUser(item)}
              >
                <MaterialIcons name="delete" size={20} color={Theme.colors.error} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </AnimatedCard>
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
        <View style={styles.headerTop}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Theme.colors.text} />
        </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('Botão criar usuário pressionado');
              setShowCreateModal(true);
            }}
            style={styles.createButton}
          >
            <MaterialIcons name="person-add" size={24} color={Theme.colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Gestão de Usuários</Text>
        <Text style={styles.headerSubtitle}>
          {filteredUsers.length} {filteredUsers.length === 1 ? 'usuário' : 'usuários'}
        </Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color={Theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuários..."
          placeholderTextColor={Theme.colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialIcons name="close" size={20} color={Theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
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
            <MaterialIcons name="people" size={64} color={Theme.colors.textTertiary} />
            <Text style={styles.emptyText}>
              {searchQuery ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Modal de Criar Usuário */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCreateModal(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalKeyboardView}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Criar Novo Usuário</Text>
                <TouchableOpacity
                  onPress={() => setShowCreateModal(false)}
                  style={styles.modalCloseButton}
                >
                  <MaterialIcons name="close" size={24} color={Theme.colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.modalScrollView}
                contentContainerStyle={styles.modalScrollContent}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps="handled"
              >
                  <Text style={styles.label}>Nome (opcional)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    placeholderTextColor={Theme.colors.textTertiary}
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                    autoCapitalize="words"
                  />

                  <Text style={styles.label}>E-mail *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="email@exemplo.com"
                    placeholderTextColor={Theme.colors.textTertiary}
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />

                  <Text style={styles.label}>Senha *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Mínimo 6 caracteres"
                    placeholderTextColor={Theme.colors.textTertiary}
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    secureTextEntry
                    autoCapitalize="none"
                  />

                  <Text style={styles.label}>Confirmar Senha *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite a senha novamente"
                    placeholderTextColor={Theme.colors.textTertiary}
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                    secureTextEntry
                    autoCapitalize="none"
                  />

                  <View style={styles.switchContainer}>
                    <View style={styles.switchLabelContainer}>
                      <MaterialIcons
                        name="admin-panel-settings"
                        size={20}
                        color={Theme.colors.textSecondary}
                      />
                      <Text style={styles.switchLabel}>Tornar Administrador</Text>
                    </View>
                    <Switch
                      value={formData.isAdmin}
                      onValueChange={(value) => setFormData({ ...formData, isAdmin: value })}
                      trackColor={{ false: Theme.colors.border, true: Theme.colors.primary }}
                      thumbColor={formData.isAdmin ? '#FFD700' : Theme.colors.textTertiary}
                    />
                  </View>

                  <GradientButton
                    title={creating ? 'Criando...' : 'Criar Usuário'}
                    onPress={handleCreateUser}
                    loading={creating}
                    variant="football"
                    style={styles.createUserButton}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      setFormData({
                        email: '',
                        password: '',
                        confirmPassword: '',
                        name: '',
                        isAdmin: false,
                      });
                      setShowCreateModal(false);
                    }}
                    style={styles.cancelButton}
                  >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundCard,
    margin: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
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
  listContent: {
    padding: Theme.spacing.md,
  },
  userCard: {
    marginBottom: Theme.spacing.md,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {
    flex: 1,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
    gap: Theme.spacing.sm,
  },
  userName: {
    ...Theme.typography.h3,
    flex: 1,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    gap: Theme.spacing.xs,
  },
  adminText: {
    ...Theme.typography.caption,
    color: '#FFD700',
    fontWeight: '600',
    fontSize: 10,
  },
  userEmail: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  userBio: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
    marginBottom: Theme.spacing.xs,
  },
  userDate: {
    ...Theme.typography.caption,
    color: Theme.colors.textTertiary,
    fontSize: 11,
  },
  actions: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    alignItems: 'flex-start',
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalKeyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Theme.colors.backgroundCard,
    borderTopLeftRadius: Theme.borderRadius.lg,
    borderTopRightRadius: Theme.borderRadius.lg,
    height: Dimensions.get('window').height * 0.75,
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  modalTitle: {
    ...Theme.typography.h2,
    fontSize: 22,
  },
  modalCloseButton: {
    padding: Theme.spacing.xs,
  },
  modalScrollView: {
    flex: 1,
  },
  modalScrollContent: {
    padding: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
  },
  label: {
    ...Theme.typography.body,
    fontWeight: '600',
    marginBottom: Theme.spacing.sm,
    marginTop: Theme.spacing.md,
    color: Theme.colors.text,
  },
  input: {
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: 16,
    color: Theme.colors.text,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: Theme.spacing.sm,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
  },
  switchLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  switchLabel: {
    ...Theme.typography.body,
    color: Theme.colors.text,
  },
  createUserButton: {
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  cancelButton: {
    padding: Theme.spacing.md,
    alignItems: 'center',
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.background,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  cancelButtonText: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    fontWeight: '600',
  },
});

