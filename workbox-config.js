module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,js,ico,html,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};