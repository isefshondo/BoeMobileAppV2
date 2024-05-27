import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 0, // Remova a borda padrão
    borderBottomWidth: 1, // Adicione uma borda na parte inferior
    borderColor: '#ccc', // Cor da borda
    borderRadius: 0, // Sem bordas arredondadas
    padding: 10,
    marginBottom: 20,
    width: '90%',
  },
  button: {
    backgroundColor: '#0000ff',
    padding: 20,
    borderRadius: 5,
    width: '90%', // Define a largura do botão
    alignItems: 'center',
    marginTop: 20, // Adiciona margem superior para separar do conteúdo anterior
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerresult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 4, // Adiciona uma borda na parte inferior
    borderBottomColor: '#FF5454', // Define a cor da borda
    borderRadius: 10, // Define bordas arredondadas
    padding: 20,
    width: '90%', // Define a largura do botão
  },
  circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2, // Define a largura da borda
        borderColor: '#FF5454', // Define a cor da borda
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        
  },
  percentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: 'black', // Defina a cor do texto conforme necessário
  },
});
