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
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Legend } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCard } from '@/components/AnimatedCard';
import { GradientButton } from '@/components/GradientButton';
import { useAuth } from '@/contexts/AuthContext';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';

interface QuizQuestion {
  id?: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  question_type: 'general' | 'biography' | 'statistics' | 'trophies' | 'career' | 'trivia';
  legend_id?: string;
  legend?: Legend;
  image_url?: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

type QuizMode = 'quick' | 'full' | 'timed' | 'challenge';

export default function QuizScreenExpanded() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [quizMode, setQuizMode] = useState<QuizMode | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (quizStarted && timeLeft !== null && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (quizStarted && timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, quizStarted]);

  const loadQuestions = async (mode: QuizMode) => {
    setLoading(true);
    try {
      let query = supabase
        .from('quiz_questions')
        .select('*, legend:legends(*)')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      // Filtrar por dificuldade baseado no modo
      if (mode === 'quick') {
        query = query.eq('difficulty', 'easy').limit(5);
      } else if (mode === 'challenge') {
        query = query.eq('difficulty', 'hard').limit(15);
      } else {
        query = query.limit(10);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (!data || data.length === 0) {
        // Se não houver perguntas no banco, criar perguntas dinâmicas
        const legends = await fetchLegends();
        const dynamicQuestions = generateDynamicQuestions(legends, mode);
        setQuestions(dynamicQuestions);
      } else {
        setQuestions(data.map(q => ({
          ...q,
          options: Array.isArray(q.options) ? q.options : [],
        })));
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      // Fallback para perguntas dinâmicas
      const legends = await fetchLegends();
      const dynamicQuestions = generateDynamicQuestions(legends, mode);
      setQuestions(dynamicQuestions);
    } finally {
      setLoading(false);
    }
  };

  const fetchLegends = async () => {
    const { data } = await supabase
      .from('legends')
      .select('*')
      .eq('is_active', true)
      .limit(20);
    return data || [];
  };

  const generateDynamicQuestions = (legends: Legend[], mode: QuizMode): QuizQuestion[] => {
    const questionTypes: QuizQuestion['question_type'][] = [
      'biography',
      'statistics',
      'trophies',
      'career',
      'trivia',
    ];

    return legends.slice(0, mode === 'quick' ? 5 : mode === 'challenge' ? 15 : 10).map((legend, index) => {
      const questionType = questionTypes[index % questionTypes.length];
      
      let question = '';
      let options: string[] = [];
      let correctAnswer = 0;

      switch (questionType) {
        case 'biography':
          question = `Qual é a nacionalidade de ${legend.name}?`;
          const nationalities = [...new Set(legends.map(l => l.nationality))].slice(0, 4);
          if (!nationalities.includes(legend.nationality)) {
            nationalities[0] = legend.nationality;
          }
          options = nationalities.sort(() => Math.random() - 0.5);
          correctAnswer = options.indexOf(legend.nationality);
          break;

        case 'statistics':
          question = `Em que posição joga ${legend.name}?`;
          const positions = [...new Set(legends.map(l => l.position))].slice(0, 4);
          if (!positions.includes(legend.position)) {
            positions[0] = legend.position;
          }
          options = positions.sort(() => Math.random() - 0.5);
          correctAnswer = options.indexOf(legend.position);
          break;

        case 'trophies':
          question = `Qual clube ${legend.name} está/já esteve associado?`;
          const clubs = [...new Set(legends.map(l => l.current_club || l.club).filter(Boolean))].slice(0, 4);
          const legendClub = legend.current_club || legend.club;
          if (legendClub && !clubs.includes(legendClub)) {
            clubs[0] = legendClub;
          }
          options = clubs.sort(() => Math.random() - 0.5);
          correctAnswer = legendClub ? options.indexOf(legendClub) : 0;
          break;

        default:
          question = `Quem é ${legend.name}?`;
          const names = legends.slice(0, 4).map(l => l.name);
          if (!names.includes(legend.name)) {
            names[0] = legend.name;
          }
          options = names.sort(() => Math.random() - 0.5);
          correctAnswer = options.indexOf(legend.name);
      }

      return {
        question,
        options,
        correct_answer: correctAnswer,
        question_type: questionType,
        legend_id: legend.id,
        legend,
        points: mode === 'challenge' ? 20 : mode === 'quick' ? 10 : 15,
        difficulty: mode === 'challenge' ? 'hard' : mode === 'quick' ? 'easy' : 'medium',
      };
    });
  };

  const startQuiz = (mode: QuizMode) => {
    setQuizMode(mode);
    setQuizStarted(true);
    setStartTime(Date.now());
    if (mode === 'timed') {
      setTimeLeft(300); // 5 minutos
    }
    loadQuestions(mode);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correct_answer;

    if (isCorrect) {
      setScore(score + 1);
      setTotalScore(totalScore + currentQuestion.points);
    }

    setShowResult(true);
  };

  const handleTimeUp = () => {
    Alert.alert('Tempo Esgotado!', 'Você não respondeu a tempo.');
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setQuizCompleted(true);
    const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

    if (user) {
      try {
        await supabase.from('quiz_results').insert([
          {
            user_id: user.id,
            total_questions: questions.length,
            correct_answers: score,
            score: totalScore,
            time_taken: timeTaken,
            difficulty: quizMode === 'challenge' ? 'hard' : quizMode === 'quick' ? 'easy' : 'medium',
            quiz_type: quizMode || 'general',
          },
        ]);
      } catch (error) {
        console.error('Error saving quiz result:', error);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTotalScore(0);
    setTimeLeft(null);
    setQuizStarted(false);
    setQuizCompleted(false);
    setStartTime(null);
    setQuizMode(null);
  };

  if (loading && !quizStarted) {
    return (
      <View style={styles.centerContainer}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (!quizStarted) {
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
          <Text style={styles.headerSubtitle}>Teste seu conhecimento</Text>
        </LinearGradient>

        <View style={styles.modesContainer}>
          <AnimatedCard delay={50}>
            <TouchableOpacity
              style={styles.modeCard}
              onPress={() => startQuiz('quick')}
            >
              <LinearGradient
                colors={Theme.colors.gradientPrimary}
                style={styles.modeCardGradient}
              >
                <MaterialIcons name="flash-on" size={48} color="#fff" />
                <Text style={styles.modeTitle}>Rápido</Text>
                <Text style={styles.modeDescription}>5 perguntas fáceis</Text>
                <Text style={styles.modePoints}>10 pontos cada</Text>
              </LinearGradient>
            </TouchableOpacity>
          </AnimatedCard>

          <AnimatedCard delay={100}>
            <TouchableOpacity
              style={styles.modeCard}
              onPress={() => startQuiz('full')}
            >
              <LinearGradient
                colors={Theme.colors.gradientFootball}
                style={styles.modeCardGradient}
              >
                <MaterialIcons name="quiz" size={48} color="#fff" />
                <Text style={styles.modeTitle}>Completo</Text>
                <Text style={styles.modeDescription}>10 perguntas médias</Text>
                <Text style={styles.modePoints}>15 pontos cada</Text>
              </LinearGradient>
            </TouchableOpacity>
          </AnimatedCard>

          <AnimatedCard delay={150}>
            <TouchableOpacity
              style={styles.modeCard}
              onPress={() => startQuiz('timed')}
            >
              <LinearGradient
                colors={['#FF6B6B', '#FF8E53']}
                style={styles.modeCardGradient}
              >
                <MaterialIcons name="timer" size={48} color="#fff" />
                <Text style={styles.modeTitle}>Contra o Tempo</Text>
                <Text style={styles.modeDescription}>5 minutos para responder</Text>
                <Text style={styles.modePoints}>Bônus por velocidade</Text>
              </LinearGradient>
            </TouchableOpacity>
          </AnimatedCard>

          <AnimatedCard delay={200}>
            <TouchableOpacity
              style={styles.modeCard}
              onPress={() => startQuiz('challenge')}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.modeCardGradient}
              >
                <MaterialIcons name="emoji-events" size={48} color="#fff" />
                <Text style={styles.modeTitle}>Desafio</Text>
                <Text style={styles.modeDescription}>15 perguntas difíceis</Text>
                <Text style={styles.modePoints}>20 pontos cada</Text>
              </LinearGradient>
            </TouchableOpacity>
          </AnimatedCard>
        </View>
      </ScrollView>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={Theme.colors.gradientDark}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Quiz Concluído!</Text>
        </LinearGradient>

        <View style={styles.resultsContainer}>
          <AnimatedCard delay={50}>
            <View style={styles.resultCard}>
              <MaterialIcons
                name={percentage >= 70 ? 'celebration' : percentage >= 50 ? 'sentiment-satisfied' : 'sentiment-dissatisfied'}
                size={64}
                color={percentage >= 70 ? '#4CAF50' : percentage >= 50 ? Theme.colors.primary : Theme.colors.error}
              />
              <Text style={styles.resultScore}>{score}/{questions.length}</Text>
              <Text style={styles.resultPercentage}>{percentage}%</Text>
              <Text style={styles.resultTotalScore}>Total: {totalScore} pontos</Text>
              <Text style={styles.resultTime}>Tempo: {Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, '0')}</Text>
            </View>
          </AnimatedCard>

          <AnimatedCard delay={100}>
            <GradientButton
              title="Tentar Novamente"
              onPress={resetQuiz}
              variant="football"
            />
          </AnimatedCard>
        </View>
      </ScrollView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <View style={styles.centerContainer}>
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
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={Theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Quiz de Lendas</Text>
            <Text style={styles.headerSubtitle}>
              Pergunta {currentQuestionIndex + 1}/{questions.length}
            </Text>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>

        {timeLeft !== null && (
          <View style={styles.timerContainer}>
            <MaterialIcons name="timer" size={20} color={Theme.colors.text} />
            <Text style={styles.timerText}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Text>
          </View>
        )}

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Pontuação: {totalScore}</Text>
          <Text style={styles.scoreText}>Acertos: {score}/{currentQuestionIndex + (selectedAnswer !== null ? 1 : 0)}</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <AnimatedCard delay={50} style={styles.questionCard}>
          {currentQuestion.image_url && (
            <Image
              source={{ uri: currentQuestion.image_url }}
              style={styles.questionImage}
            />
          )}
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          {currentQuestion.legend && (
            <View style={styles.legendHint}>
              <Text style={styles.legendHintText}>
                Dica: {currentQuestion.legend.nationality} • {currentQuestion.legend.position}
              </Text>
            </View>
          )}
        </AnimatedCard>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correct_answer;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <AnimatedCard key={index} delay={100 + index * 50}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionSelected,
                    showCorrect && styles.optionCorrect,
                    showWrong && styles.optionWrong,
                  ]}
                  onPress={() => handleAnswer(index)}
                  disabled={showResult}
                >
                  <Text style={[
                    styles.optionText,
                    (isSelected || showCorrect) && styles.optionTextSelected,
                  ]}>
                    {option}
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
                name={selectedAnswer === currentQuestion.correct_answer ? 'celebration' : 'sentiment-dissatisfied'}
                size={48}
                color={selectedAnswer === currentQuestion.correct_answer ? '#4CAF50' : Theme.colors.error}
              />
              <Text style={styles.resultText}>
                {selectedAnswer === currentQuestion.correct_answer ? 'Correto! 🎉' : 'Incorreto! 😔'}
              </Text>
              {currentQuestion.explanation && (
                <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
              )}
              {selectedAnswer === currentQuestion.correct_answer && (
                <Text style={styles.pointsText}>+{currentQuestion.points} pontos</Text>
              )}
            </View>
          </AnimatedCard>
        )}

        {showResult && (
          <AnimatedCard delay={350}>
            <GradientButton
              title={currentQuestionIndex < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado Final'}
              onPress={nextQuestion}
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
    paddingBottom: Theme.spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
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
    ...Theme.typography.h1,
    fontSize: 28,
    marginBottom: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
  },
  headerSubtitle: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    paddingHorizontal: Theme.spacing.md,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Theme.spacing.sm,
    gap: Theme.spacing.xs,
  },
  timerText: {
    ...Theme.typography.h3,
    color: Theme.colors.text,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Theme.spacing.md,
    marginTop: Theme.spacing.md,
  },
  scoreText: {
    ...Theme.typography.body,
    fontWeight: '600',
  },
  modesContainer: {
    padding: Theme.spacing.md,
    gap: Theme.spacing.md,
  },
  modeCard: {
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
    ...Theme.shadows.lg,
  },
  modeCardGradient: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
    minHeight: 180,
    justifyContent: 'center',
  },
  modeTitle: {
    ...Theme.typography.h2,
    color: '#fff',
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.xs,
  },
  modeDescription: {
    ...Theme.typography.body,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: Theme.spacing.xs,
  },
  modePoints: {
    ...Theme.typography.caption,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    padding: Theme.spacing.md,
  },
  questionCard: {
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.xl,
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
    backgroundColor: Theme.colors.backgroundLight,
  },
  questionText: {
    ...Theme.typography.h2,
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
  },
  legendHint: {
    backgroundColor: Theme.colors.backgroundLight,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
    marginTop: Theme.spacing.sm,
  },
  legendHintText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
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
  explanationText: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
  },
  pointsText: {
    ...Theme.typography.h3,
    color: Theme.colors.primary,
    marginTop: Theme.spacing.sm,
  },
  resultsContainer: {
    padding: Theme.spacing.md,
  },
  resultScore: {
    ...Theme.typography.h1,
    fontSize: 48,
    marginTop: Theme.spacing.md,
  },
  resultPercentage: {
    ...Theme.typography.h2,
    marginTop: Theme.spacing.sm,
  },
  resultTotalScore: {
    ...Theme.typography.h3,
    marginTop: Theme.spacing.md,
  },
  resultTime: {
    ...Theme.typography.body,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.sm,
  },
});

