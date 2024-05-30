const Location = require('../models/Location.model');

// CRUD Endpoints
exports.addLocation = async (request, response) => {
    try {
        const location = new Location(request.body);
        await location.save();
        response.code(201).send(location);
    } catch (err) {
        response.code(500).send(err);
    }
};

exports.getLocationById = async (request, response) => {
    try {
        const location = await Location.findById(request.params.id);
        if (!location) {
            return response.code(404).send({ message: 'Location not found' });
        }
        response.send(location);
    } catch (err) {
        response.code(500).send(err);
    }
};

exports.updateLocationById = async (request, response) => {
    try {
        const location = await Location.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!location) {
            return response.code(404).send({ message: 'Location not found' });
        }
        response.send(location);
    } catch (err) {
        response.code(500).send(err);
    }
};

exports.deleteLocationById = async (request, response) => {
    try {
        const location = await Location.findByIdAndDelete(request.params.id);
        if (!location) {
            return response.code(404).send({ message: 'Location not found' });
        }
        response.send({ message: 'Location deleted' });
    } catch (err) {
        response.code(500).send(err);
    }
};
