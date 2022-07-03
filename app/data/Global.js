import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAccountProviders } from '../../api/accountProviders';

/**
 * `Array` with all the account providers available to use.
 */
export var ACCOUNT_PROVIDERS = [];

/**
 * Load the list of account providers into the `AsyncStorage` to make it global.
 * 
 * @returns The successful status of the loading process.
 */
const loadAccountProviders = async () => {
  try {
    const providers = await getAccountProviders();
    ACCOUNT_PROVIDERS = providers;
    // await AsyncStorage.setItem('@account_providers', providers);

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}

/**
 * Load all the necessary data for the app to work properly.
 * 
 * It includes: 
 * - Account providers 
 * 
 * @returns The successful status of the loading process.
 */
export const loadGlobalData = async () => {
  let loaded = false;
  try {
    const accountProviders = await AsyncStorage.getItem('@account_providers');
    if (accountProviders === null) {
      loaded = await loadAccountProviders();
    }
  } catch (error) {
    console.error(error);
  }
  // console.log("LOAD GLOBAL DATA:", loaded);
  // return loaded;
}