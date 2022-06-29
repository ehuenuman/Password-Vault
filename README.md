# Password Vault
Password Vault is a simple mobile application that allows securely manage the passwords that we always forget. 

## How does it work?
The app contains a form to write the login details about some accounts. The principal focus is security. The most important data are encrypted before sending to the server and decrypted after fetching to display them on the app. Once save some password a list view display all the accounts. Edit and delete are allowed. 

### What about the code?
- It is a React Native app built using Expo (managed workflow)
- NativeBase to create the UI
- Firestore to store the data and Auth to manage the users

### Encryption
The most important data are encrypted using [CryptoES](https://github.com/entronad/crypto-es).

*Password Vault uses AES-256 with PBKDF2 for the key derivation.*


