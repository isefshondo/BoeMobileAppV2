import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import Iconalerta from './alerta.svg';
import Iconcontaminacao from './contaminacao.svg';


type DiagnosticScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DiagnosticScreen'
>;

const DiagnosticScreen = () => {
  const navigation = useNavigation<DiagnosticScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0000ff', '#ffffff']} // Cores do gradiente
        style={styles.halfColorBox}
        start={{ x: 0.5, y: 0 }} // Começa do topo
        end={{ x: 0.5, y: 0.5 }}    // Termina na base
      >
        <View style={styles.content}>
          <Text style={[styles.description, styles.textRight]}>Resultado:</Text>
          <Text style={[styles.diagnosticText, styles.textRight]}>Dermatofitose Bovina</Text>
          <View style={styles.separator} />
          <View style={styles.detailsContainer}>
            <View style={styles.circle}>
              <Text style={styles.percentage}>80%</Text>
            </View>
            <Text style={styles.description}>Texto explicativo aqui{'\n'}Texto explicativo aqui</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Primeiro bloco de texto */}
      <View style={styles.textBlock}>
      <View style={styles.textIcon}>
        <Iconcontaminacao />
        <Text style={styles.boldText}> Fase de contaminação</Text>
        </View>
        <Text>
          Grave: As lesões podem ser extensas, afetando áreas significativas da pele do animal. 
          Isso pode levar a complicações, como infecções secundárias, dor, desconforto e até mesmo 
          problemas de saúde mais graves.
        </Text>
      </View>

      {/* Segundo bloco de texto */}
      <View style={styles.textBlock}>
      <View style={styles.textIcon}>
      <Iconalerta />
        <Text style={styles.boldText}> Complicações</Text>
        </View>
        <Text>
          O animal pode sentir dor, coceira intensa e desconforto, afetando seu bem-estar. Pode haver perda de peso, 
          queda na produção de leite e comprometimento do sistema imunológico, 
          tornando o animal mais suscetível a outras doenças.
        </Text>
      </View>

      {/* Botão azul */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CadastroBovino')}>
        <Text style={styles.buttonText}>Cadastrar Bovino</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DiagnosticScreen;
