export default {
  name: "Secure All",
  slug: "password-vault",
  description: "Password Vault is a simple mobile application that allows securely manage the passwords that we always forget.",
  version: "1.0.0",
  orientation: "portrait",
  icon: "app/assets/icon_bg_color.png",
  splash: {
    image: "app/assets/splash_transparent.png",
    resizeMode: "contain",
    backgroundColor: "#00263F"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "app/assets/icon_bg_transparent.png",
      backgroundColor: "#00263F"
    },
    package: process.env.PACKAGE || "com.ehuenuman.passwordvault"
  }
}
