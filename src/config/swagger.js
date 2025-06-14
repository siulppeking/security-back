const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Security Service API',
        version: '1.0.0',
        description: 'API para autenticación, usuarios, perfiles y menús',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Servidor local',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{ bearerAuth: [] }],
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js', './src/models/*.js'], // Puedes agregar más si quieres documentar otros archivos
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
