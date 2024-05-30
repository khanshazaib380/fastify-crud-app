const mongoose = require('mongoose');
const supertest = require('supertest');
const configs = require('../configs/configs');

// Import the app 
// const app = require('../app'); 

const request = supertest('http://localhost:3000');

beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(configs.DB_URI);
});

afterAll(async () => {
    // Clean up the database after tests
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

let locationId;


describe('Location API', () => {
    it('should create a new location', async () => {
        const response = await request.post('/locations').send({
            name: 'Test Location',
            latitude: 40.7128,
            longitude: -73.006,
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');

        locationId = response.body._id;
    });

    it('should get a location by id', async () => {
        const response = await request.get(`/locations/${locationId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Test Location');
        expect(response.body).toHaveProperty('latitude', 40.7128);
        expect(response.body).toHaveProperty('longitude', -73.006);
    });

    it('should update a location by id', async () => {
        const response = await request.put(`/locations/${locationId}`).send({
            name: 'Test Location updated',
            latitude: 46.7128,
            longitude: -73.006,
        });

        expect(response.status).toBe(200);

        const updatedResponse = await request.get(`/locations/${locationId}`);
        expect(updatedResponse.status).toBe(200);
        expect(updatedResponse.body).toHaveProperty('name', 'Test Location updated');
        expect(updatedResponse.body).toHaveProperty('latitude', 46.7128);
        expect(updatedResponse.body).toHaveProperty('longitude', -73.006);
    });

    it('should delete a location by id', async () => {
        const response = await request.delete(`/locations/${locationId}`);

        expect(response.status).toBe(200);

        const deletedResponse = await request.get(`/locations/${locationId}`);
        expect(deletedResponse.status).toBe(404);
    });

    it('should return 404 for a non-existent location', async () => {
        const response = await request.get(`/locations/60c72b1f9b1e8c1f8c8c8c8c`);

        expect(response.status).toBe(404);
    });
});



it('test', async () => {
    const response = await request.get(`/`);

    expect(response.status).toBe(200);
});
