import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Legend } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCard } from '@/components/AnimatedCard';
import { GradientButton } from '@/components/GradientButton';

interface QuizQuestion {
  legend: Legend;
  options: Legend[];
  correctAnswer: string;
}

export default function QuizScreen() {
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    loadQuestion();
  }, [currentQuestion]);

  const loadQuestion = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(null);

    try {
      // Buscar lendas aleatórias
      const { data: legends, error } = await supabase
        .from('legends')
        .select('*')
        .eq('is_active', true)
        .limit(10);

      if (error) throw error;

      if (!legends || legends.length < 4) {
        Alert.alert('Erro', 'Não há lendas suficientes para o quiz');
        return;
      }

      // Selecionar uma lenda aleatória como pergunta
      const randomLegend = legends[Math.floor(Math.random() * legends.length)];
      
      // Selecionar 3 outras lendas aleatórias como opções erradas
      const otherLegends = legends
        .filter(l => l.id !== randomLegend.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      // Misturar opções
      const options = [...otherLegends, randomLegend].sort(() => Math.random() - 0.5);

      setQuestion({
        legend: randomLegend,
        options,
        correctAnswer: randomLegend.id,
      });
    } catch (error) {
      console.error('Error loading question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (legendId: string) => {
    if (selectedAnswer) return; // Já respondeu

    setSelectedAnswer(legendId);
    const correct = legendId === question?.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    loadQuestion();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (!question) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.emptyContainer}>
          <MaterialIcons name="quiz" size={64} color={Theme.colors.textTertiary} />
          <Text style={styles.emptyText}>Não foi possível carregar o quiz</Text>
        </View>
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
        <Text style={styles.headerTitle}>Quiz de Lendas</Text>
        <Text style={styles.headerSubtitle}>
          Pergunta {currentQuestion + 1} • Pontuação: {score}
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <AnimatedCard delay={50} style={styles.questionCard}>
          <Text style={styles.questionText}>
            Qual é a nacionalidade de {question.legend.name}?
          </Text>
        </AnimatedCard>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option.id;
            const isCorrectAnswer = option.id === question.correctAnswer;
            const showCorrect = showResult && isCorrectAnswer;
            const showWrong = showResult && isSelected && !isCorrectAnswer;

            return (
              <AnimatedCard key={option.id} delay={100 + index * 50}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionSelected,
                    showCorrect && styles.optionCorrect,
                    showWrong && styles.optionWrong,
                  ]}
                  onPress={() => handleAnswer(option.id)}
                  disabled={showResult}
                >
                  <Text style={[
                    styles.optionText,
                    (isSelected || showCorrect) && styles.optionTextSelected,
                  ]}>
                    {option.nationality || 'Desconhecida'}
                  </Text>
                  {showCorrect && (
                    <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                  )}
                  {showWrong && (
                    <MaterialIcons name="cancel" size={24} color={Theme.colors.error} />
                  )}
                </TouchableOpacity>
              </AnimatedCard>
            );
          })}
        </View>

        {showResult && (
          <AnimatedCard delay={300} style={styles.resultCard}>
            <View style={styles.resultContent}>
              <MaterialIcons
                name={isCorrect ? 'celebration' : 'sentiment-dissatisfied'}
                size={48}
                color={isCorrect ? '#4CAF50' : Theme.colors.error}
              />
              <Text style={styles.resultText}>
                {isCorrect ? 'Correto! 🎉' : 'Incorreto! 😔'}
              </Text>
              <Text style={styles.resultSubtext}>
                {isCorrect
                  ? `${question.legend.name} é ${question.legend.nationality}`
                  : `A resposta correta é: ${question.legend.nationality}`}
              </Text>
            </View>
          </AnimatedCard>
        )}

        {showResult && (
          <AnimatedCard delay={350}>
            <GradientButton
              title={currentQuestion < 9 ? 'Próxima Pergunta' : 'Ver Resultado Final'}
              onPress={currentQuestion < 9 ? nextQuestion : () => router.push('/quiz/result')}
              variant="football"
            />
          </AnimatedCard>
        )}
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
  },
  content: {
    padding: Theme.spacing.md,
  },
  questionCard: {
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.xl,
  },
  questionText: {
    ...Theme.typography.h2,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.backgroundLight,
    borderWidth: 2,
    borderColor: Theme.colors.border,
  },
  optionSelected: {
    borderColor: Theme.colors.primary,
    backgroundColor: 'rgba(90, 200, 250, 0.1)',
  },
  optionCorrect: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  optionWrong: {
    borderColor: Theme.colors.error,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  optionText: {
    ...Theme.typography.h3,
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: '700',
  },
  resultCard: {
    marginBottom: Theme.spacing.lg,
  },
  resultContent: {
    alignItems: 'center',
    padding: Theme.spacing.lg,
  },
  resultText: {
    ...Theme.typography.h2,
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  resultSubtext: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xxl,
  },
  emptyText: {
    ...Theme.typography.h3,
    marginTop: Theme.spacing.md,
    color: Theme.colors.textSecondary,
  },
});

