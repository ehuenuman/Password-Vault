import { Timestamp } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";
import CryptoES from "crypto-es";

import { auth } from "../../api/firebaseConfig";
import { deletePasswordRegister, getAllEncryptedData, updatePasswordRegister, writePasswordRegister } from "../../api/userPasswordData";

class Vault {
  #cryptedVault;
  #decryptedVault = [];
  #USER_ID = "";

  /**
   * Initialise the Vault fetching all the encrypted data from the database.
   * 
   * @returns True|False - Final state of the fetching.
   */
  async init() {
    // Should be return the user token?
    this.#decryptedVault = [];
    let success = false;
    this.#USER_ID = auth.currentUser.uid;
    await getAllEncryptedData(this.#USER_ID)
      .then(
        async data => {
          // Get user's keys from keychain
          const KEY_PHRASE = await SecureStore.getItemAsync("KEY_PHRASE");
          const SALT = await SecureStore.getItemAsync("SALT")
          const IV = await SecureStore.getItemAsync("IV")
          // Calculate the KEY
          const KEY = CryptoES.PBKDF2(KEY_PHRASE, SALT, { keySize: 512 / 32 });
          // Decrypt every password and put it in the vault
          data.forEach(element => {
            const decryptedRegister = CryptoES.AES.decrypt(element.ct, KEY, { iv: CryptoES.enc.Hex.parse(IV) });
            this.#decryptedVault.push({ ...JSON.parse(decryptedRegister.toString(CryptoES.enc.Utf8)), id: element.id });
          });
          success = true;
        })
      .catch(error => console.error(error));
    return success;
  }

  /**
   * Gets all the vault's decrypted data.
   * 
   * @returns {array} Array with objects
   */
  allDecryptedData() {

    let decryptedData = this.#decryptedVault;
    return decryptedData;
  }

  /**
   * Gets the information of one register using its ID.
   * 
   * @param {string} id 
   * @returns Object
   */
  registerById(id) {
    // console.log(this.#USER_ID);
    const register = this.#decryptedVault.filter(object => object.id == id);
    return register[0];
  }

  /**
   * Call the API to save the new register in Firestore and update the Decrypted Vault.
   * 
   * @param {object} data Data to be add into the database.
   * @returns The ID of the new register.
   */
  async newRegister(data) {
    // console.log(this.#USER_ID);
    let newRegisterId = "";
    let tempRegister = {
      ...data,
      dataType: "password",
      accountProvider: data.accountName,
      createTimestamp: Timestamp.now(),
      updateTimestamp: Timestamp.now(),
    }

    // Get the keys from the keychain
    const KEY_PHRASE = await SecureStore.getItemAsync("KEY_PHRASE");
    const SALT = await SecureStore.getItemAsync("SALT");
    const IV = await SecureStore.getItemAsync("IV");
    // Encrypt
    const key = CryptoES.PBKDF2(KEY_PHRASE, SALT, { keySize: 512 / 32 });
    const encryptedRegister = CryptoES.AES.encrypt(JSON.stringify(tempRegister), key, { iv: CryptoES.enc.Hex.parse(IV) });

    await writePasswordRegister(auth.currentUser.uid, encryptedRegister.toString())
      .then(registerId => {
        if (registerId) {
          tempRegister.id = registerId;
          this.#decryptedVault.push(tempRegister);
          newRegisterId = registerId;
        }
      });

    return newRegisterId;
  }

  /**
   * Call the API to update a register by its ID.
   * 
   * @param {string} id Password ID.
   * @param {object} data A object with the new data.
   * @returns A `boolean` indicates the success of the updating process.
   */
  async updateRegister(id, data) {
    let registerUpdated = false;
    delete data.id;
    let updatedRegister = {
      ...data,
      updateTimestamp: Timestamp.now()
    }

    // Get the keys from the keychain
    const KEY_PHRASE = await SecureStore.getItemAsync("KEY_PHRASE");
    const SALT = await SecureStore.getItemAsync("SALT");
    const IV = await SecureStore.getItemAsync("IV");
    // Encrypt
    const key = CryptoES.PBKDF2(KEY_PHRASE, SALT, { keySize: 512 / 32 });
    const encryptedRegister = CryptoES.AES.encrypt(JSON.stringify(updatedRegister), key, { iv: CryptoES.enc.Hex.parse(IV) });

    await updatePasswordRegister(this.#USER_ID, id, encryptedRegister.toString())
      .then(response => {
        if (response)
          this.#decryptedVault = this.#decryptedVault.filter(object => {
            if (object.id === id) {
              object = {
                ...updatedRegister,
                id: id
              }
            }
            return object;
          });
        registerUpdated = response;
      });

    return registerUpdated;
  }

  /**
   * Call the API to delete a register by its ID.
   * 
   * @param {string} id Password's ID.
   * @return A `boolean` indicates the success of the deleting process.
   */
  async deleteRegister(id) {
    return deletePasswordRegister(this.#USER_ID, id)
      .then(response => {
        if (response)
          this.#decryptedVault = this.#decryptedVault.filter(object => object.id !== id);
        return response;
      });
  }
}


export var vault = new Vault()
