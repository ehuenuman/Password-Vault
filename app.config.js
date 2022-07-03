import 'dotenv/config';

const IS_PROD = process.env.APP_VARIANT === "production"
const IS_DEV = process.env.APP_VARIANT == "development"

export default {
  name: "SecurityPass",
  slug: "password-vault",
  description: "SecurityPass is a simple mobile application that allows securely manage the passwords that we always forget.",
  version: "0.5.0",
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
      foregroundImage: "app/assets/adaptative_icon_launcher.png",
      backgroundColor: "#00263F"
    },
    package: IS_PROD ? "com.ehuenuman.passwordvault" : "com.ehuenuman.passwordvault." + process.env.APP_VARIANT
  }
}
