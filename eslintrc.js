module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'react-app',
        'react-app/jest',
        'plugin:prettier/recommended', // 这里先配置下，后面有安装
    ],
    plugins: ['@typescript-eslint', 'react'],
    rules: {},
};
