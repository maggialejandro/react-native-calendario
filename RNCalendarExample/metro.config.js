const blacklist = require('metro-config/src/defaults/blacklist');
const glob = require('glob-to-regexp');
const path = require('path');

function getBlacklist() {
  const nodeModuleDirs = [
    glob(`${path.resolve(__dirname, '..')}/node_modules/*`),
  ];
  return blacklist(nodeModuleDirs);
}

module.exports = {
  resolver: {
    blacklistRE: getBlacklist(),
    providesModuleNodeModules: [
      'react-native',
      'react',
      'moment',
      '@babel/runtime',
    ],
  },
  watchFolders: [path.resolve(__dirname, '..')],
};
