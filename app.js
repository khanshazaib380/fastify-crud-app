// app.js
const fastify = require('fastify')();
const { addLocation, getLocationById, updateLocationById, deleteLocationById } = require('./controllers/Location.controller');
const connectDb = require('./configs/db');
const { swaggerOptions, locationSchema, locationResponseSchema, errorResponseSchema } = require('./swagger');

const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');

// Register swagger
fastify.register(fastifySwagger, swaggerOptions);

// Define schemas
fastify.addSchema(locationSchema);
fastify.addSchema(locationResponseSchema);
fastify.addSchema(errorResponseSchema);

// Register routes
fastify.get('/', (req, res) => res.code(200).send({ message: 'hello' }));

fastify.get('/locations/:id', {
  schema: {
    tags: ['location'],
    description: 'Get a location by ID',
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      }
    },
    response: {
      200: { $ref: 'LocationResponse#' },
      404: { $ref: 'ErrorResponse#' }
    }
  }
}, getLocationById);

fastify.post('/locations', {
  schema: {
    tags: ['location'],
    description: 'Add a new location',
    body: { $ref: 'Location#' },
    response: {
      201: { $ref: 'LocationResponse#' },
      500: { $ref: 'ErrorResponse#' }
    }
  }
}, addLocation);

fastify.put('/locations/:id', {
  schema: {
    tags: ['location'],
    description: 'Update a location by ID',
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      }
    },
    body: { $ref: 'Location#' },
    response: {
      200: { $ref: 'LocationResponse#' },
      404: { $ref: 'ErrorResponse#' },
      500: { $ref: 'ErrorResponse#' }
    }
  }
}, updateLocationById);

fastify.delete('/locations/:id', {
  schema: {
    tags: ['location'],
    description: 'Delete a location by ID',
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      }
    },
    response: {
      200: { $ref: 'ErrorResponse#' },
      404: { $ref: 'ErrorResponse#' },
      500: { $ref: 'ErrorResponse#' }
    }
  }
}, deleteLocationById);

// Register Swagger UI plugin
fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    validatorUrl: null,
  },
});

const PORT = 3000;

fastify.listen({ port: PORT }, err => {
  if (err) {
    console.error(err);
  }
  console.log('Server listening on port ' + PORT);
  connectDb();
});

module.exports = fastify;
