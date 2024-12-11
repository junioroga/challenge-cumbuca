const packagesToTransform = [
  "react-native",
  "react-native-(.*)",
  "@react-native",
  "@react-native-community",
  "expo",
  "expo-(.*)",
  "react-native-svg",
  "@expo/vector-icons"
]

const config = {
  preset: 'jest-expo',
  // test environment setup
  setupFiles: ['./jest.setup.js'],
  clearMocks: true,
  // module resolution
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transformIgnorePatterns: [
    `node_modules/(?!(${packagesToTransform.join("|")})/)`
  ],
  // module transformation
  testRegex: "\\.spec\\.tsx?$",
  transform: {
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  //coverage
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 80,
      statements: 70,
    },
  },
}

module.exports = config
