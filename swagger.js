// swagger.js
module.exports = {
    swaggerOptions: {
      routePrefix: '/api-docs',
      exposeRouteTags: true,
      swagger: {
        info: {
          title: 'Location API',
          description: 'API documentation for Location management',
          version: '1.0.0'
        },
        tags: [
          { name: 'location', description: 'Location related endpoints' }
        ]
      }
    },
    locationSchema: {
      $id: 'Location',
      type: 'object',
      properties: {
        name: { type: 'string' },
        latitude: { type: 'number' },
        longitude: { type: 'number' }
      }
    },
    locationResponseSchema: {
      $id: 'LocationResponse',
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        latitude: { type: 'number' },
        longitude: { type: 'number' }
      }
    },
    errorResponseSchema: {
      $id: 'ErrorResponse',
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  };
  