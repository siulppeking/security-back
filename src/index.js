require('dotenv').config();;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const connectDB = require('./db');
const authRouter = require('./routes/authRoute');
const routerPerfil = require('./routes/perfilRoute');
const empresaRouter = require('./routes/empresaRoute');

const app = express();

const origins = [
    'http://localhost:5173',
    //'https://security-v1.netlify.app',
    //'https://sso.fap.mil.pe'
];

app.use(cors({
    origin: origins
}));
app.use(morgan('dev'));
app.use(express.json());

const port = process.env.PORT || 3000;


app.use('/api/auth', authRouter);
app.use('/api/perfil', routerPerfil);
app.use('/api/empresa', empresaRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

connectDB();