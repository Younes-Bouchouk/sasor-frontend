module.exports = {
    preset: 'jest-expo',
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: ['**/test/**/*.test.tsx'],
    setupFilesAfterSetup: [],
  };