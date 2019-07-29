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
     * store()
     * @apiDescription Store Vehicle
     * @api {post} /vehicles Store Vehicle
     * @apiVersion 1.0.0
     * @apiName Store Vehicle
     * @apiGroup Vehicle
     *
     * @apiParam {String} name             Name. <label class="label label-warning">required</label>
     * @apiParam {String} license          License. <label class="label label-warning">required</label>
     * @apiParam {String} color            Color. <label class="label label-warning">required</label>
     * @apiParam {String} model            Model. <label class="label label-warning">required</label>
     * @apiParam {String} photo            Photo. <label class="label label-warning">required</label>
     * @apiParam {Number} motorPark        Motor park. <label class="label label-warning">required</label>
     *
     * @apiSuccessExample Json-Example:
     *  Content-Type: application/json
     * {
     *     "motorPark": 2,
     *     "name": "Audi",
     *     "license": "ytrewq",
     *     "color": "black",
     *     "model": "Unknown",
     *     "photo": "https://placekitten.com/300/300"
     * }
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 201 OK
     * {
     * 	"message": "OK",
     * 	"status": "success",
     * 	"title": "",
     *  	"data": {
     * 	     "motorPark": 2,
     * 	     "_id": "5d2ea120b41e6b0a82cc7646",
     * 	     "name": "Audi",
     * 	     "license": "ytrewq",
     * 	     "color": "black",
     * 	     "model": "Unknown",
     * 	     "photo": "https://placekitten.com/300/300",
     * 	     "updatedAt": "2019-07-17T04:16:32.546Z",
     * 	     "createdAt": "2019-07-17T04:16:32.546Z",
     * 	     "__v": 0
     *  	}
     * }
     *
     * @apiSuccessExample Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *    "message": "ERROR",
     *    "status": "error",
     *    "title": "",
     *    "data": {}
     * }
     *
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
     * index()
     * @apiDescription Vehicle List
     * @api {get} /vehicles Vehicle List
     * @apiVersion 1.0.0
     * @apiName Vehicle List
     * @apiGroup Vehicle
     *
     * @apiParam {Number} [motorPark]              Motor Park.
     *
     * @apiSuccessExample Url-Example:
     * /vehicles?motorPark=2
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * 	"message": "OK",
     * 	"status": "success",
     * 	"title": "",
     *    "data": [
	*	     {
	*	         "motorPark": 2,
	*	         "_id": "5d2e992033185f05da35f72a",
	*	         "name": "Audi",
	*	         "license": "ytrewq",
	*	         "color": "black",
	*	         "model": "Unknown",
	*	         "photo": "https://placekitten.com/300/300",
	*	         "createdAt": "2019-07-17T03:42:23.996Z",
	*	         "updatedAt": "2019-07-17T03:42:23.996Z"
	*	     },
	*	     ...
     *    ]
     * }
     *
     * @apiSuccessExample Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *    "message": "ERROR",
     *    "status": "error",
     *    "title": "",
     *    "data": {}
     * }
     *
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
     * show()
     * @apiDescription Vehicle By Id
     * @api {get} /vehicles/:vehicle_id Vehicle By Id
     * @apiVersion 1.0.0
     * @apiName Vehicle By Id
     * @apiGroup Vehicle
     *
     * @apiParam {String} id              Id.  <label class="label label-warning">required</label>
     *
     * @apiSuccessExample Url-Example:
     * /vehicles/5d2e992033185f05da35f72a
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * 	"message": "OK",
     * 	"status": "success",
     * 	"title": "",
     *    "data": {
	*		"motorPark": 2,
	*		"_id": "5d2e992033185f05da35f72a",
	*		"name": "Audi",
	*		"license": "ytrewq",
	*		"color": "black",
	*		"model": "Unknown",
	*		"photo": "https://placekitten.com/300/300",
	*		"createdAt": "2019-07-17T03:42:23.996Z",
	*		"updatedAt": "2019-07-17T03:42:23.996Z"
	*	}
     * }
     *
     * @apiSuccessExample Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *    "message": "ERROR",
     * 	"status": "error",
     * 	"title": "",
     *    "data": {}
     * }
     *
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
     * edit()
     * @apiDescription Update Vehicle By Id
     * @api {put} /vehicles/:vehicle_id Update Vehicle By Id
     * @apiVersion 1.0.0
     * @apiName Update Vehicle By Id
     * @apiGroup Vehicle
     *
     * @apiParam {String} name             Name. <label class="label label-warning">required</label>
     * @apiParam {String} license          License. <label class="label label-warning">required</label>
     * @apiParam {String} color            Color. <label class="label label-warning">required</label>
     * @apiParam {String} model            Model. <label class="label label-warning">required</label>
     * @apiParam {String} photo            Photo. <label class="label label-warning">required</label>
     * @apiParam {Number} motorPark        Motor park. <label class="label label-warning">required</label>
     *
     * @apiSuccessExample Json-Example:
     *  Content-Type: application/json
     * {
     *     "motorPark": 3,
     *     "name": "Chevrolet",
     *     "license": "321654",
     *     "color": "black",
     *     "model": "Unknown",
     *     "photo": "https://placekitten.com/300/300"
     * }
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * 	"message": "OK",
     * 	"status": "success",
     * 	"title": "",
     *  	"data": {
     * 	     "motorPark": 3,
     * 	     "_id": "5d2ea120b41e6b0a82cc7646",
     * 	     "name": "Chevrolet",
     * 	     "license": "321654",
     * 	     "color": "black",
     * 	     "model": "Unknown",
     * 	     "photo": "https://placekitten.com/300/300"
     *  	}
     * }
     *
     * @apiSuccessExample Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *    "message": "ERROR",
     * 	"status": "error",
     * 	"title": "",
     *    "data": {}
     * }
     *
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
			Vehicle.updateOne({ _id: data._id }, data, function(err) {
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
     * delete()
     * @apiDescription Delete Vehicle By Id
     * @api {delete} /vehicles Delete Vehicle By Id
     * @apiVersion 1.0.0
     * @apiName Delete Vehicle By Id
     * @apiGroup Vehicle
     *
     * @apiParam {String} id              Id.  <label class="label label-warning">required</label>
     *
     * @apiSuccessExample Url-Example:
     * /vehicles/5d2e992033185f05da35f72a
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * 	"message": "OK",
     * 	"status": "success",
     * 	"title": "",
     *    "data": {}
     * }
     *
     * @apiSuccessExample Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *    "message": "ERROR",
     *    "status": "error",
     *    "title": "",
     *    "data": {}
     * }
     *
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
			res.send(200, general.responseJsonSuccess({}));
			next();
		});
	});
};   