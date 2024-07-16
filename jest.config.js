module.exports = {
    // Корневая директория проекта
    roots: ['<rootDir>/src'],

    // Файлы, которые Jest должен учитывать для выполнения тестов
    testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],

    // Пресет для TypeScript
    preset: 'ts-jest',

    // Пути к модулям, которые необходимо игнорировать при трансформации
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],

    // Пути к файлам, которые необходимо исключить из тестирования
    testPathIgnorePatterns: ['/node_modules/'],

    // Файлы-заглушки, которые необходимо загружать перед запуском тестов
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};