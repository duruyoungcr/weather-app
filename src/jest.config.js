
module.exports = {
    moduleDirectories: [
        'node_modules',
        'utils', // a utility folder
        __dirname, // the root directory
    ],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
}