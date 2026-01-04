import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { GradientButton } from '@/components/GradientButton';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { AnimatedCard } from '@/components/AnimatedCard';
import { Alert } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      setTimeout(() => {
        router.replace('/(tabs)/home');
      }, 100);
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.message || 'Ocorreu um erro ao fazer login';
      Alert.alert('Erro ao fazer login', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={Theme.colors.gradientDark}
        style={styles.background}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <MaterialIcons name="sports-soccer" size={64} color={Theme.colors.footballLight} />
            </View>
            <Text style={styles.title}>Futebol Legends</Text>
            <Text style={styles.subtitle}>Entre para explorar as lendas</Text>
          </View>

          <AnimatedCard style={styles.card}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={20} color={Theme.colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor={Theme.colors.textTertiary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={20} color={Theme.colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={Theme.colors.textTertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <GradientButton
              title={loading ? 'Entrando...' : 'Entrar'}
              onPress={handleLogin}
              loading={loading}
              style={styles.button}
            />

            <Link href="/(auth)/forgot-password" asChild>
              <Text style={styles.linkText}>Esqueceu a senha?</Text>
            </Link>
          </AnimatedCard>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Não tem uma conta? </Text>
            <Link href="/(auth)/register" asChild>
              <Text style={styles.signupLink}>Cadastre-se</Text>
            </Link>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Theme.spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  title: {
    ...Theme.typography.h1,
    fontSize: 36,
    marginBottom: Theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    marginBottom: Theme.spacing.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundLight,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  inputIcon: {
    marginLeft: Theme.spacing.md,
  },
  input: {
    flex: 1,
    padding: Theme.spacing.md,
    fontSize: 16,
    color: Theme.colors.text,
  },
  button: {
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  linkText: {
    ...Theme.typography.body,
    color: Theme.colors.primaryLight,
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Theme.spacing.lg,
  },
  signupText: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
  },
  signupLink: {
    ...Theme.typography.body,
    color: Theme.colors.primaryLight,
    fontWeight: 'bold',
  },
});
