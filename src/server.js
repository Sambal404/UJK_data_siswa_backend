// /src/server.js

const express = require('express');
const env = require('./config/env');
const cors = require('cors');

const logger = require('./utils/logger');
const errorHandler = require('./middlewares/error.middleware');

// routes source
const siswaRoutes = require('./routes/siswa.routes');

// express
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routings
app.use('/api/v1/siswa', siswaRoutes);

// errorHandler | loggers
app.use(errorHandler);

const PORT = env.port || 3000;

app.listen(PORT, () => {
    console.log(`${env.appName} running on port ${PORT}`);
})
