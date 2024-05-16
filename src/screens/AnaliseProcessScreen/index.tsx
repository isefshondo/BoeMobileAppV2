import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const DiagnosticScreen = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.blueBox]}>
        <View style={styles.blueArea}>
          <Text style={styles.diagnosticText}>Dermatofitose Bovina</Text>
          </View>    
          <View style={styles.detailsContainer}>
            <View style={styles.circle}>
              <Text style={styles.percentage}>80%</Text>
            </View>
            <Text style={styles.description}>Texto explicativo aqui{'\n'}Texto explicativo aqui</Text>
            
          </View>
        
      </View>
       {/* Primeiro bloco de texto */}
       <View style={styles.textBlock}>
        <Image source={require('./contaminacao.png')} style={styles.image} /> {/* Substitua 'caminho/para/sua/imagem' pelo caminho da sua imagem */}
        <Text style={styles.boldText}>Texto em negrito</Text>
        <Text>Linha 1</Text>
        <Text>Linha 2</Text>
        <Text>Linha 3</Text>
        <Text>Linha 4</Text>
      </View>

      {/* Segundo bloco de texto */}
      <View style={styles.textBlock}>
        <Image source={require('./alerta.png')} style={styles.image} /> {/* Substitua 'caminho/para/sua/outra/imagem' pelo caminho da sua imagem */}
        <Text style={styles.boldText}>Outro texto em negrito</Text>
        <Text>Linha 1</Text>
        <Text>Linha 2</Text>
        <Text>Linha 3</Text>
        <Text>Linha 4</Text>
      </View>

      {/* Botão azul */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Botão</Text>
      </TouchableOpacity>
    </View>
    
  );
};

export default DiagnosticScreen;
