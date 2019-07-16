const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const VehicleSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
        },
        license: {
			type: String,
			required: true,
			trim: true,
        },
        color: {
			type: String,
			required: true,
			trim: true,
        },
        model: {
			type: String,
			required: true,
			trim: true,
        },
        photo: {
			type: String,
			required: true,
			trim: true,
		},
		motorPark: {
			type: Number,
			required: true,
			enum: [1, 2, 3, 4],
			default: 1,
		},
	},
	{ minimize: false },
);

VehicleSchema.plugin(timestamps);
VehicleSchema.plugin(mongooseStringQuery);

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle; 