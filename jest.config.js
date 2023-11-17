const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

const esModules = ['.*\\.mjs$'].join('|');

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/app',
  coveragePathIgnorePatterns: [
    "<rootDir>/src/core/store/*",
    ".module.ts"
  ],
  moduleNameMapper: Object.assign(pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/src',
  }), {
  }),
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  maxWorkers: '50%',
  cacheDirectory: '<rootDir>/.cache',
};
