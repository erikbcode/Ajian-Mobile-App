module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        ["module:react-native-dotenv", {
          "envName": "APP_ENV",
          "moduleName": "module:react-native-dotenv",
          "path": ".env",
          "blocklist": null,
          "allowlist": null,
          "safe": false,
          "allowUndefined": true,
          "verbose": false
        }]
      ]
    };
  };