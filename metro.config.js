const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Usar configuração padrão recomendada do Expo
// Removida configuração unstable_enableSymlinks que causava problemas

module.exports = config;

