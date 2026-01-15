const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Workaround para Windows - evitar criação de diretório node:sea
config.resolver = {
  ...config.resolver,
  unstable_enableSymlinks: false,
};

module.exports = config;

