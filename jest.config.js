/* eslint-disable prettier/prettier */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageThreshold: { global: { branches: 95, functions: 100, lines: 100 } },
  coverageReporters: ['lcov'],
  coverageDirectory: './output/code-coverage/',
  setupFilesAfterEnv: ['./jest.config.js'],
  // setTimeout: 60000,
}
