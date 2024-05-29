import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export const RegisterCowScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Cadastro do animal</Text>
        <Text>Cadastre os dados do animal e uma imagem de identificação para iniciar a análise</Text>
      </View>
      <View>
        {/* Image Picker */}
        <View>
          <TextInput placeholder="AI0234" />
          <TextInput placeholder="Nome do animal" />
        </View>
      </View>
      <TouchableOpacity>
        <Text>Iniciar análise</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};