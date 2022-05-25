import { Timestamp } from "firebase/firestore";
import { v5 as uuidv5 } from 'uuid';

import { createUserPasswordData, getAllEncryptedData } from "../../api/userPasswordData";

class Vault {
  #cryptedVault;
  #decryptedVault;
  #USER_ID = "1b671a64-40d5-491e-99b0-da01ff1f3341"
  #setDecryptedData;

  /**
   * Initialise the Vault fetching all the encrypted data from the database.
   * 
   * @returns True|False - Final state of the fetching.
   */
  async init(setDecryptedData) {
    var success = false;
    this.#setDecryptedData = setDecryptedData;
    await getAllEncryptedData()
      .then(
        data => {
          // console.log(data);
          this.#cryptedVault = data;
          this.#decryptedVault = data;
          this.#setDecryptedData(this.#decryptedVault);
          success = !success;
        },
        error => {
          console.log(error);
        }
      );
    return success
  }

  /**
   * Gets all the vault's decrypted data.
   * 
   * @returns {array} Array with objects
   */
  allDecryptedData() {
    return this.#decryptedVault;
  }

  /**
   * Gets the information of one register using its ID.
   * 
   * @param {string} id 
   * @returns Object
   */
  registerById(id) {
    const register = this.#decryptedVault.filter(object => object.id == id);
    return register[0]
  }

  /**
   * Save the new register in the local variable (state) and 
   * call the API to add a new document.
   * 
   * @param {object} data 
   * @returns True
   */
  async newRegister(data) {
    var status = false;
    var tempRegister = {
      ...data,
      dataType: "password",
      accountType: data.accountName,
      createTimestamp: Timestamp.now(),
      updateTimestamp: Timestamp.now(),
      id: uuidv5(Timestamp.now().valueOf(), this.#USER_ID)
    }

    console.log(tempRegister);
    this.#decryptedVault.push(tempRegister);
    this.#setDecryptedData(this.#decryptedVault);
    createUserPasswordData(tempRegister)
      .then(
        message => status = true,
        error => console.log(error)
      );

    return true
  }

}

export var vault = new Vault();
