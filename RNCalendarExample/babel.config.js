module.exports = (api) => {
  api.cache(false);
  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          'react-native-calendario': '../lib/index',
        },
      },
    ],
  ];

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
    sourceMaps: true,
  };
};
