import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfColorBox: {
    width: '90%',
    height: 200, // Altura do gradiente
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  diagnosticText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
  separator: {
    height: 20,
  },
  textBlock: {
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20, // Adiciona margem horizontal
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
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
  textRight: {
    textAlign: 'right', // Alinha o texto à direita
  },
});
