module.exports = {
	name: 'vehicle-api',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 8000,
	base_url: process.env.BASE_URL || 'http://localhost:8000',
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vehicle-api',
	},
};