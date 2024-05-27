import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  },
  statusContainer: {
    marginBottom: 20,
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
  analysisResults: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  percentage: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  resultText: {
    fontSize: 16,
  },
  infectionChance: {
    fontSize: 16,
    marginBottom: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  descriptionImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  descriptionTextContainer: {
    flex: 1,
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
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
