import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ['<rootDir>/src'],
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
    preset: 'ts-jest',

    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.tsx?$',

    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        // see: https://github.com/kulshekhar/ts-jest/issues/414#issuecomment-517944368
        '^@src/(.*)$': '<rootDir>/src/$1',
    },
    // listTests: true,
};

export default config;
