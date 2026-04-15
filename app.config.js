import 'dotenv/config'

export default {
  expo: {
    name: "DynoManage",
    slug: "mobile-heroku-expo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "dynomanage",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.kolosek.herokumng",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundColor: "#79589F",
      },
      package: "com.kolosek.herokumng",
    },
    plugins: [
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#79589F",
        },
      ],
    ],
    extra: {
      API_URL: process.env.API_URL,
      INTERNAL_API_URL: process.env.INTERNAL_API_URL,
      AD_AUTH_URL: process.env.AD_AUTH_URL,
      AD_NOAUTH_URL: process.env.AD_NOAUTH_URL,
      APTABASE_APP_KEY: process.env.APTABASE_APP_KEY,
      "eas": {
        "projectId": "d84978b2-a814-48a9-8528-6bec38d6a2ac"
      }
    },
  },
}
