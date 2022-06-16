import { Timestamp } from "firebase/firestore";

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
   * Call the API to save the new register in Firestore and update the Decrypted Vault.
   * 
   * @param {object} data 
   * @returns A `boolean` that indicates the success of the process.
   */
  async newRegister(data) {
    // console.log(this.#USER_ID);
    let registerSaved = false;
    let tempRegister = {
      ...data,
      dataType: "password",
      accountProvider: data.accountName,
      createTimestamp: Timestamp.now(),
      updateTimestamp: Timestamp.now(),
    }

    await writePasswordRegister(this.#USER_ID, tempRegister)
      .then(registerId => {
        if (registerId) {
          tempRegister.id = registerId;
          this.#decryptedVault.push(tempRegister);
          registerSaved = true;
        }
      })
      .catch(error => console.error(error));

    return registerSaved
  }
}

export var vault = new Vault()
