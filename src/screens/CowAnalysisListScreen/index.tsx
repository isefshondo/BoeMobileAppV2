import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const CowAnalysisListScreen = () => {
  return (
    <View style={styles.container}>
      {/* Foto do Animal e Informações Básicas */}
      <View style={styles.headerContainer}>
        <Image source={require('./boi.jpg')} style={styles.animalImage} />
        <View style={styles.animalInfo}>
          <Text style={styles.animalId}>ID: 12345</Text>
          <Text style={styles.animalName}>Nome do Animal</Text>
        </View>
      </View>

      {/* Status do Tratamento */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Status do Tratamento:</Text>
        <View style={styles.statusIndicatorContainer}>
          <View style={styles.statusIndicator} />
          <Text style={styles.statusDescription}>Sem Tratamento</Text>
        </View>
      </View>

      {/* Últimas Análises */}
      <View style={styles.analysisContainer}>
        <Text style={styles.analysisTitle}>Últimas Análises</Text>
        <Text style={styles.analysisDate}>Data: 20/05/2024</Text>
        <View style={styles.analysisResults}>
          <Text style={styles.percentage}>80%</Text>
          <Text style={styles.resultText}>Resultados</Text>
        </View>
        <Text style={styles.infectionChance}>Chance de Infecção</Text>
        <View style={styles.descriptionContainer}>
          <Image source={require('./boi.jpg')} style={styles.descriptionImage} />
          <View style={styles.descriptionTextContainer}>
            <Text style={styles.descriptionTitle}>Descrição da Análise</Text>
            <Text style={styles.descriptionText}>
              Esta é uma descrição breve da análise. Inclui algumas informações importantes.
            </Text>
          </View>
        </View>
      </View>

      {/* Histórico */}
      <Text style={styles.historyTitle}>Histórico</Text>

      {/* Botão Nova Análise */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Nova Análise</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CowAnalysisListScreen;
