import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    width: 300,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  blueBox: {
    overflow: 'hidden',
  },
  blueArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  diagnosticText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  textBlock: { // Adicione esta propriedade
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 20, // Defina o tamanho da imagem conforme necessário
    height: 20, // Defina o tamanho da imagem conforme necessário
    marginRight: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
