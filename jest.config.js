module.exports = {
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.ts$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}
