import { Timestamp } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";
import CryptoES from "crypto-es";

import { auth } from "../../api/firebaseConfig";
import { deletePasswordRegister, getAllEncryptedData, updatePasswordRegister, writePasswordRegister } from "../../api/userPasswordData";

class Vault {
  #cryptedVault;
  #decryptedVault;
  #user_id;

  constructor() {
    this.#cryptedVault = [];
    this.#decryptedVault = [];
    this.#user_id = "";
  }

  /**
   * Initialise the Vault fetching all the encrypted data from the database.
   * 
   * @returns True|False - Final state of the fetching.
   */
  async init() {
    // Should be return the user token?
    this.#decryptedVault = [];
    let success = false;
    this.#user_id = auth.currentUser.uid;
    await getAllEncryptedData(this.#user_id)
      .then(
        async data => {
          // Get user's keys from keychain
          const PASSPHRASE = await SecureStore.getItemAsync("PASSPHRASE");
          const SALT = await SecureStore.getItemAsync("SALT")
          const IV = await SecureStore.getItemAsync("IV")
          // Calculate the KEY
          const KEY = CryptoES.PBKDF2(PASSPHRASE, SALT, { keySize: 512 / 32, iterations: 5000 });
          // Decrypt every password and put it in the vault
          data.forEach(element => {
            const decryptedRegister = CryptoES.AES.decrypt(element.ct, KEY, { iv: CryptoES.enc.Hex.parse(IV) });
            delete element.ct;
            this.#decryptedVault.push({ ...JSON.parse(decryptedRegister.toString(CryptoES.enc.Utf8)), ...element });
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
  async createRegister(data) {
    let newRegisterId = "";
    let metaData = {
      dataType: "password",
      accountProvider: data.accountName,
      createTimestamp: Timestamp.now(),
      updateTimestamp: Timestamp.now(),
    }
    let decryptedRegister = {
      ...data,
      ...metaData,
    }
    let ct = {
      user: data.user,
      password: data.password,
    }

    // Get the keys from the keychain
    const PASSPHRASE = await SecureStore.getItemAsync("PASSPHRASE");
    const SALT = await SecureStore.getItemAsync("SALT");
    const IV = await SecureStore.getItemAsync("IV");
    // Encrypt
    const KEY = CryptoES.PBKDF2(PASSPHRASE, SALT, { keySize: 512 / 32, iterations: 5000 });
    const encryptedPassword = CryptoES.AES.encrypt(JSON.stringify(ct), KEY, { iv: CryptoES.enc.Hex.parse(IV) });

    let encryptedRegister = {
      ...data,
      ...metaData,
      ct: encryptedPassword.toString(),
    }
    delete encryptedRegister.user;
    delete encryptedRegister.password;

    await writePasswordRegister(auth.currentUser.uid, encryptedRegister)
      .then(registerId => {
        if (registerId) {
          decryptedRegister.id = registerId;
          this.#decryptedVault.push(decryptedRegister);
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
    let metaData = {
      updateTimestamp: Timestamp.now()
    }
    let decryptedRegister = {
      ...data,
      ...metaData,
    }
    let ct = {
      user: data.user,
      password: data.password,
    }

    // Get the keys from the keychain
    const PASSPHRASE = await SecureStore.getItemAsync("PASSPHRASE");
    const SALT = await SecureStore.getItemAsync("SALT");
    const IV = await SecureStore.getItemAsync("IV");
    // Encrypt
    const KEY = CryptoES.PBKDF2(PASSPHRASE, SALT, { keySize: 512 / 32, iterations: 5000 });
    const encryptedPassword = CryptoES.AES.encrypt(JSON.stringify(ct), KEY, { iv: CryptoES.enc.Hex.parse(IV) });

    let encryptedRegister = {
      ...data,
      ...metaData,
      ct: encryptedPassword.toString(),
    }
    delete encryptedRegister.user;
    delete encryptedRegister.password;

    await updatePasswordRegister(this.#user_id, id, encryptedRegister)
      .then(response => {
        if (response)
          this.#decryptedVault = this.#decryptedVault.map(element => {
            // console.log(element);
            if (element.id === id) {
              let temp = { ...element, ...decryptedRegister }
              // console.log(temp);
              return temp;
            }
            return element
          });
        registerUpdated = response;
      });

    // console.log(this.#decryptedVault);

    return registerUpdated;
  }

  /**
   * Call the API to delete a register by its ID.
   * 
   * @param {string} id Password's ID.
   * @return A `boolean` indicates the success of the deleting process.
   */
  async deleteRegister(id) {
    return deletePasswordRegister(this.user_id, id)
      .then(response => {
        if (response)
          this.#decryptedVault = this.#decryptedVault.filter(object => object.id !== id);
        return response;
      });
  }
}


export var vault = new Vault()
