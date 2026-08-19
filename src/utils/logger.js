const pino = require('pino');
const path = require('path');
const env = require('../config/env');

// log file location
const appLogPath = path.join(__dirname, '../../logs/app.log');
const errorLogPath = path.join(__dirname, '../../logs/error.log');

const targets = [
    {
        target: 'pino/file',
        options: { destination: appLogPath, mkdir: true },
        level: 'info'
    },
    {
        target: 'pino/file',
        options: { destination: errorLogPath, mkdir: true },
        level: 'error'
    }
];

if (env.nodeEnv === 'development') {
    targets.push({
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard'
        }, 
        level: 'debug' 
    });
}

// Buat instance logger
const logger = pino(
    {
        level: env.nodeEnv === 'development' ? 'debug' : 'info',
        timestamp: pino.stdTimeFunctions.isoTime,
    },
    pino.transport({ targets })
);

module.exports = logger;