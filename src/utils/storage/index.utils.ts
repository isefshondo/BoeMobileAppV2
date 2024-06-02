import * as SecureStore from 'expo-secure-store';

export async function setInStorage(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log(error);
  }
}

export async function getFromStorage(key) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log(error);
  }
}

export async function removeFromStorage(key) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
}
