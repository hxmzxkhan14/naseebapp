const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Workaround for Supabase 'ws' module issue on React Native (Expo SDK 50+)
// Prioritizes 'browser' condition to use global WebSocket, and falls back if needed.
config.resolver.unstable_conditionNames = ['browser', 'require', 'default'];

// If the above doesn't resolve the issue, uncommenting the following line
// might be necessary as a more direct approach, though it's less ideal.
// config.resolver.unstable_enablePackageExports = false;

module.exports = config; 