import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    
    padding: 10,
    backgroundColor: '#fff',
    
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  animalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  animalInfo: {
    marginLeft: 15,
  },
  animalId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  animalName: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  result: {
    marginBottom: 20,
  },
  resulttext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  resultdoenca: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',

  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
   
  },
  statusIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red', // Cor para indicar status
    marginRight: 10,
    
  },
  statusDescription: {
    fontSize: 16,
 
  },
  analysisContainer: {
    marginBottom: 20,
    
    
    
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  analysisDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  analysiscontainerinfection:{
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  analysisResults: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: 70,
    height: 70,
    borderRadius:35,
    borderWidth: 4, // Define a largura da borda
    borderColor: '#FFEB36', // Define a cor da borda
    justifyContent: 'center',
    marginRight: 10,
  },

percentage: {
fontSize: 22,
fontWeight: 'bold',
color: 'black',
},
  resultText: {
    fontSize: 16,
  },
  infectionChance: {
    fontSize: 18,
    marginBottom: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  descriptionImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    
  },
  descriptionTextContainer: {
    flex: 1,
    padding: 10,
    
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
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
  percentagehist: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: 'black', // Defina a cor do texto conforme necessário
  },
});
