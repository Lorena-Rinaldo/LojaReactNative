import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, Dimensions, Alert, StyleSheet } from 'react-native';

// Obtém as dimensões da tela para posicionamento aleatório
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ExploreOutsideTabs2() {
  // ============================================
  // ESTADOS DO JOGO
  // ============================================
  const [score, setScore] = useState(0); // Pontuação atual (0-10)
  const [lives, setLives] = useState(3); // Vidas restantes (3 corações)
  const [timeLeft, setTimeLeft] = useState(5); // Tempo restante em segundos
  const [gameActive, setGameActive] = useState(true); // Status do jogo ativo/inativo
  const [symbolPosition, setSymbolPosition] = useState({ x: 100, y: 200 }); // Posição do símbolo na tela

  // ============================================
  // CONFIGURAÇÕES DO JOGO
  // ============================================
  const SYMBOL_SIZE = 60; // Tamanho do símbolo clicável
  const GAME_TIME = 5; // Tempo limite por rodada em segundos
  
  // Área útil da tela (descontando margens e tamanho do símbolo)
  const PLAYABLE_WIDTH = screenWidth - SYMBOL_SIZE - 40;
  const PLAYABLE_HEIGHT = screenHeight - SYMBOL_SIZE - 200; // Deixa espaço para HUD

  // ============================================
  // FUNÇÕES PRINCIPAIS
  // ============================================

  // Função para gerar posição aleatória para o símbolo
  const generateRandomPosition = useCallback(() => {
    const newX = Math.random() * PLAYABLE_WIDTH + 20;
    const newY = Math.random() * PLAYABLE_HEIGHT + 100; // Offset para o HUD superior
    
    return {
      x: Math.max(20, Math.min(newX, PLAYABLE_WIDTH)),
      y: Math.max(100, Math.min(newY, PLAYABLE_HEIGHT + 100))
    };
  }, [PLAYABLE_WIDTH, PLAYABLE_HEIGHT]);

  // Função chamada quando o jogador clica no símbolo
  const handleSymbolClick = useCallback(() => {
    if (!gameActive) return; // Não faz nada se o jogo estiver inativo

    // Incrementa a pontuação
    setScore(prevScore => {
      const newScore = prevScore + 1;
      
      // Verifica se chegou ao máximo de pontos (10)
      if (newScore >= 10) {
        setGameActive(false);
        Alert.alert(
          'Parabéns! 🎉',
          `Você ganhou com ${newScore} pontos!`,
          [{ text: 'Jogar Novamente', onPress: resetGame }]
        );
      }
      
      return newScore;
    });
    
    // Reposiciona o símbolo aleatoriamente
    setSymbolPosition(generateRandomPosition());
    
    // Reinicia o timer
    setTimeLeft(GAME_TIME);
  }, [gameActive, generateRandomPosition]);

  // Função para reiniciar o jogo
  const resetGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setTimeLeft(GAME_TIME);
    setGameActive(true);
    setSymbolPosition(generateRandomPosition());
  }, [generateRandomPosition]);

  // Função chamada quando o tempo acaba
  const handleTimeOut = useCallback(() => {
    if (!gameActive) return;

    const newLives = lives - 1;
    setLives(newLives);

    if (newLives <= 0) {
      // Game Over - sem vidas restantes
      setGameActive(false);
      Alert.alert(
        'Game Over! 💀',
        `Pontuação final: ${score}/10`,
        [{ text: 'Jogar Novamente', onPress: resetGame }]
      );
    } else {
      // Perde uma vida mas continua jogando
      setSymbolPosition(generateRandomPosition());
      setTimeLeft(GAME_TIME);
    }
  }, [gameActive, lives, score, generateRandomPosition, resetGame]);

  // ============================================
  // EFFECTS (TIMERS E LÓGICA AUTOMÁTICA)
  // ============================================

  // Timer do jogo - conta regressiva
  useEffect(() => {
    if (!gameActive) return;

    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameActive, handleTimeOut]);

  // ============================================
  // FUNÇÕES DE RENDERIZAÇÃO
  // ============================================

  // Renderiza os corações das vidas
  const renderLives = () => {
    const hearts = [];
    for (let i = 0; i < 3; i++) {
      hearts.push(
        <Text key={i} style={styles.heart}>
          {i < lives ? '❤️' : '🤍'}
        </Text>
      );
    }
    return hearts;
  };

  // ============================================
  // RENDER PRINCIPAL
  // ============================================
  return (
    <View style={styles.gameContainer}>
      {/* ==================== HUD SUPERIOR ==================== */}
      <View style={styles.hudContainer}>
        {/* Pontuação */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            ⚡ {score}/10
          </Text>
        </View>

        {/* Vidas */}
        <View style={styles.livesContainer}>
          {renderLives()}
        </View>

        {/* Timer */}
        <View>
          <Text style={[
            styles.timerText, 
            { color: timeLeft <= 2 ? '#ff4757' : '#00ff88' }
          ]}>
            {timeLeft}s
          </Text>
        </View>
      </View>

      {/* ==================== ÁREA DE JOGO ==================== */}
      <View style={styles.gameArea}>
        {gameActive && (
          <TouchableOpacity
            onPress={handleSymbolClick}
            style={[
              styles.symbol,
              {
                left: symbolPosition.x,
                top: symbolPosition.y,
                transform: [{ scale: timeLeft <= 2 ? 1.1 : 1.0 }]
              }
            ]}
            activeOpacity={0.7}
          >
            {/* 
              ============================================
              🎯 ÍCONE CLICÁVEL - ALTERE AQUI!
              ============================================
              
              OPÇÕES PARA ALTERAR O ÍCONE:
              
              1. USAR EMOJI DIFERENTE:
                 <Text style={styles.symbolText}>🚀</Text>
                 <Text style={styles.symbolText}>⭐</Text>
                 <Text style={styles.symbolText}>🎯</Text>
              
              2. USAR IMAGEM LOCAL:
                 <Image 
                   source={require('./assets/react-logo.png')} 
                   style={{ width: 40, height: 40 }}
                 />
              
              3. USAR ÍCONE DE BIBLIOTECA:
                 import Icon from 'react-native-vector-icons/FontAwesome';
                 <Icon name="react" size={30} color="#ffffff" />
              
              4. USAR TEXTO:
                 <Text style={styles.symbolText}>RN</Text>
            */}
            <Text style={styles.symbolText}>
              ⚛️
            </Text>
          </TouchableOpacity>
        )}

        {/* Indicador visual no canto */}
        {gameActive && (
          <View style={styles.indicator} />
        )}

        {/* ==================== TELA DE GAME OVER ==================== */}
        {!gameActive && (
          <View style={styles.gameOverContainer}>
            <Text style={[
              styles.gameOverTitle,
              { color: score >= 10 ? '#00ff88' : '#ff4757' }
            ]}>
              {score >= 10 ? 'VOCÊ GANHOU!' : 'GAME OVER'}
            </Text>
            
            <Text style={styles.finalScore}>
              Pontuação: {score}/10
            </Text>
            
            <TouchableOpacity
              onPress={resetGame}
              style={styles.restartButton}
            >
              <Text style={styles.restartButtonText}>
                JOGAR NOVAMENTE
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

// ============================================
// ESTILOS DO JOGO
// ============================================
const styles = StyleSheet.create({
  // Container principal do jogo
  gameContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a' // Fundo escuro
  },
  
  // HUD Superior
  hudContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#00ff88' // Verde neon
  },
  
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  
  scoreText: {
    color: '#00ff88',
    fontSize: 18,
    fontWeight: 'bold'
  },
  
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  
  heart: {
    fontSize: 20,
    marginRight: 5
  },
  
  timerText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  
  // Área do jogo
  gameArea: {
    flex: 1,
    position: 'relative'
  },
  
  // Símbolo clicável
  symbol: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#00ff88',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10
  },
  
  symbolText: {
    fontSize: 30,
    color: '#ffffff'
  },
  
  // Indicador visual
  indicator: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 20,
    height: 20,
    backgroundColor: '#00ff88',
    borderRadius: 10
  },
  
  // Tela de Game Over
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  
  gameOverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20
  },
  
  finalScore: {
    color: '#00ff88',
    fontSize: 24,
    marginBottom: 30
  },
  
  restartButton: {
    backgroundColor: '#00ff88',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25
  },
  
  restartButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold'
  }
});