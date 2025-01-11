module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(node-fetch)/)", // Inclui node-fetch para ser transformado
      ],
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],

  };
  