const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'production', // Может быть 'production' или 'development'
	entry: './src/main.ts',
	output: {
		filename: 'contentScript.js',
		path: path.resolve(__dirname, 'build'),
	},
	resolve: {
		alias: {
			'@scripts': path.resolve(__dirname, 'src/scripts'),
			'@services': path.resolve(__dirname, 'src/services'),
		},
		extensions: ['.ts', '.js', 'tsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'popup.html',
			template: './src/index.html',
		}),   
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/, // Добавляем правило для файлов SCSS
				use: [
					'style-loader', // Вставляет стили в DOM при запуске приложения (подходит для разработки)
					'css-loader', // Загружает CSS в JavaScript
					'sass-loader', // Компилирует SCSS в CSS
				],
			},
		],
	},
	watch: true,
};
