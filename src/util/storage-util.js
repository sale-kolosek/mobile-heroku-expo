import AsyncStorage from '@react-native-async-storage/async-storage';

const getAsyncStorageItem = async key => {
  try {
    const name = await AsyncStorage.getItem(key);

    return name;
  } catch (e) {
    return false;
    // console.error("Failed to load async storage item")
  }
};

const setAsyncStorageItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // console.error("Failed to save async storage item")
  }
};

const removeAsyncStorageItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // console.error("Failed to remove async storage item")
  }
};

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // console.error("Failed to clear async storage")
  }
};

export default {
  getAsyncStorageItem,
  setAsyncStorageItem,
  removeAsyncStorageItem,
  clearAsyncStorage,
};
