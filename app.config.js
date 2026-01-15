// Configuração alternativa para Expo
// Este arquivo pode ajudar a resolver problemas de build

module.exports = {
  expo: {
    name: "Futebol Legends",
    slug: "futebol-legends",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.futebollegends.app"
    },
    android: {
      package: "com.futebollegends.app",
      permissions: [
        "android.permission.INTERNET",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE"
      ]
    },
    plugins: [
      "expo-router",
      "expo-notifications"
    ],
    scheme: "futebol-legends",
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "f4cb8b55-265c-4d56-909c-25ad112621a9"
      }
    }
  }
};

