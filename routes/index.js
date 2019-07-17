/**
 * Module Dependencies
 */
const errors = require('restify-errors');
const general = require('../helpers/general');

/**
 * Model Schema
 */
const Vehicle = require('../models/vehicle');

module.exports = function(server) {

	/**
	 * POST
	 */
	server.post('/vehicles', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'"),
			);
		}
		let data = req.body || {};
		let vehicle = new Vehicle(data);
		vehicle.save(function(err) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
				next();
			}
			res.header('content-type', 'json');
			res.send(201, general.responseJsonSuccess(vehicle));
			next();
		});
	});

	/**
	 * LIST
	 */
	server.get('/vehicles', (req, res, next) => {
		Vehicle.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}
			res.header('content-type', 'json');
			res.send(200, general.responseJsonSuccess(docs));
			next();
		});
	});

	/**
	 * GET
	 */
	server.get('/vehicles/:vehicle_id', (req, res, next) => {
		Vehicle.findOne({ _id: req.params.vehicle_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}
			res.header('content-type', 'json');
			res.send(200, general.responseJsonSuccess(doc));
			next();
		});
	});

	/**
	 * UPDATE
	 */
	server.put('/vehicles/:vehicle_id', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'"),
			);
		}
		let data = req.body || {};
		if (!data._id) {
			data = Object.assign({}, data, { _id: req.params.vehicle_id });
		}
		Vehicle.findOne({ _id: req.params.vehicle_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			} else if (!doc) {
				return next(
					new errors.ResourceNotFoundError(
						'The resource you requested could not be found.',
					),
				);
			}
			Vehicle.update({ _id: data._id }, data, function(err) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message),
					);
				}
				res.header('content-type', 'json');
				res.send(200, general.responseJsonSuccess(data));
				next();
			});
		});
	});

	/**
	 * DELETE
	 */
	server.del('/vehicles/:vehicle_id', (req, res, next) => {
		Vehicle.remove({ _id: req.params.vehicle_id }, function(err) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}
			res.header('content-type', 'json');
			res.send(204, general.responseJsonSuccess({}));
			next();
		});
	});
};   