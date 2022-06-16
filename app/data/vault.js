import { Timestamp } from "firebase/firestore";
import { v5 as uuidv5 } from 'uuid';

import { auth } from "../../api/firebaseConfig";
import { getAllEncryptedData, writePasswordRegister } from "../../api/userPasswordData";

class Vault {
  #cryptedVault;
  #decryptedVault;
  #USER_ID = "";

  /**
   * Initialise the Vault fetching all the encrypted data from the database.
   * 
   * @returns True|False - Final state of the fetching.
   */
  async init() {
    let success = false;
    this.#USER_ID = auth.currentUser.uid;
    await getAllEncryptedData(this.#USER_ID)
      .then(
        data => {
          this.#cryptedVault = data;
          this.#decryptedVault = data;
          success = !success;
        })
      .catch(error => console.error(error));

    return success
  }

  /**
   * Gets all the vault's decrypted data.
   * 
   * @returns {array} Array with objects
   */
  allDecryptedData() {

    let decryptedData = this.#decryptedVault;
    return decryptedData
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
    return register[0]
  }

  /**
   * Save the new register in the local variable (state) and 
   * call the API to add a new document in Firestore.
   * 
   * @param {object} data 
   * @returns True
   */
  async newRegister(data) {
    // console.log(this.#USER_ID);
    let status = false;
    let tempRegister = {
      ...data,
      dataType: "password",
      accountProvider: data.accountName,
      createTimestamp: Timestamp.now(),
      updateTimestamp: Timestamp.now(),
      id: uuidv5(Timestamp.now().valueOf(), '1b671a64-40d5-491e-99b0-da01ff1f3341')
    }

    this.#decryptedVault.push(tempRegister);
    await writePasswordRegister(this.#USER_ID, tempRegister)
      .then(() => status = true)
      .catch(error => console.error(error));

    return status
  }

}

export var vault = new Vault()
