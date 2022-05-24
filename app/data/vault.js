import { getAllEncryptedData } from "../../api/userPasswordData";

class Vault {
  #cryptedVault;
  #decryptedVault;

  async init() {
    var success = false;
    await getAllEncryptedData()
      .then(
        data => {
          // console.log(data);
          this.#cryptedVault = data;
          this.#decryptedVault = data;
          success = !success;
        },
        error => {
          console.log(error);
        }
      );
    return success
  }


  get AllDecryptedData() {
    return this.#decryptedVault;
  }

  /**
   * 
   * @param {string} id 
   * @returns Object
   */
  registerById(id) {
    const register = this.#decryptedVault.filter(object => object.id == id);
    return register[0]
  }
}

export var vault = new Vault();
