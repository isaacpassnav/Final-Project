const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Hospital Appointment Management API',
        description: 'Hospital Appointment Management API'
    },
    host: 'localhost:5000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);