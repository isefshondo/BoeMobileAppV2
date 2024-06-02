import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './styles';
import Fotoboi from './boiperfil.svg';
import Boiinfec from './boiinfectado.svg';

const CowAnalysisListScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled contentContainerStyle={styles.container}>
        {/* Foto do Animal e Informações Básicas */}
        <View style={styles.headerContainer}>
          <Fotoboi />
          <View style={styles.animalInfo}>
            <Text style={styles.animalId}>ID: 12345</Text>
            <Text style={styles.animalName}>Chica</Text>
          </View>
        </View>
        <View style={styles.result}>
          <Text style={styles.resulttext}>Resultado:</Text>
          <Text style={styles.resultdoenca}>Dermatofitose Bovina</Text>
        </View>
        {/* Status do Tratamento */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Status do {'\n'}Tratamento:</Text>
          <View style={styles.statusIndicatorContainer}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusDescription}>Sem Tratamento</Text>
          </View>
        </View>

        {/* Últimas Análises */}
        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>Últimas Análises</Text>
          <Text style={styles.analysisDate}>Data: 20/05/2024</Text>
          <View style={styles.analysiscontainerinfection}>
            <View style={styles.analysisResults}>
              <Text style={styles.percentage}>50%</Text>
            </View>

            <Text style={styles.infectionChance}>
              Moderado {'\n'}Chance de Infecção
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Boiinfec />
            <View style={styles.descriptionTextContainer}>
              <Text style={styles.descriptionTitle}>Descrição da Análise</Text>
              <Text style={styles.descriptionText}>
                Esta é uma descrição breve da análise. Inclui algumas {'\n'}
                informações importantes.
              </Text>
            </View>
          </View>
        </View>

        {/* Histórico */}
        <Text style={styles.historyTitle}>Histórico</Text>
        <View style={styles.containerresult}>
          <View style={styles.circle}>
            <Text style={styles.percentagehist}>80%</Text>
          </View>
          <Text style={styles.text}>de chance de infecção</Text>
        </View>
        <View style={styles.containerresult}>
          <View style={styles.circle}>
            <Text style={styles.percentagehist}>80%</Text>
          </View>
          <Text style={styles.text}>de chance de infecção</Text>
        </View>
        {/* Botão Nova Análise */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+ Nova Análise</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CowAnalysisListScreen;
