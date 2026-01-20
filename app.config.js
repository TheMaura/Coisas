// Configuração do Expo
// Todas as configurações estão aqui para evitar conflito com app.json

module.exports = {
  expo: {
    name: "Futebol Legends",
    slug: "futebol-legends",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#1a1a1a"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.futebollegends.app",
      icon: "./assets/icon.png"
    },
    android: {
      package: "com.futebollegends.app",
      icon: "./assets/icon.png",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#1a1a1a"
      },
      permissions: [
        "android.permission.INTERNET",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.READ_MEDIA_IMAGES",
        "android.permission.CAMERA",
        "android.permission.ACCESS_NETWORK_STATE"
      ],
      usesCleartextTraffic: false,
      networkSecurityConfig: {
        cleartextTrafficPermitted: false
      }
    },
    plugins: [
      "expo-router",
      "expo-notifications",
      "expo-video",
      [
        "expo-image-picker",
        {
          photosPermission: "O app precisa de acesso às suas fotos para adicionar imagens de lendas.",
          cameraPermission: "O app precisa de acesso à câmera para tirar fotos."
        }
      ]
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

