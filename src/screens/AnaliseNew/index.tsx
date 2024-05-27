import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { styles } from './styles';

const CadastroBovinoScreen = () => {
  const [nomeBovino, setNomeBovino] = useState(''); // Estado para armazenar o nome do bovino
  const [idCadastro, setIdCadastro] = useState('');

  return (
    <View style={styles.container}>
      {/* Imagem do Bovino */}
      <View style={styles.imageContainer}>
        <Image source={require('./boi.jpg')} style={styles.image} />
      </View>

      {/* ID do Cadastro */}
      <TextInput
        style={styles.input}
        value={idCadastro}
        onChangeText={setIdCadastro}
        placeholder="ID"
      />

      {/* Nome do Bovino */}
      <TextInput
        style={styles.input}
        value={nomeBovino}
        onChangeText={setNomeBovino}
        placeholder="Nome"
      />

      {/* Box de porcentagem de contaminação */}
      <View style={styles.containerresult}>
        <View style={styles.circle}>
          <Text style={styles.percentage}>80%</Text>
        </View>
        <Text style={styles.text}>de chance de infecção</Text>
      </View>

      {/* Botão Salvar Análise */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar Análise</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroBovinoScreen;
