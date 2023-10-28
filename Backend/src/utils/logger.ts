import winston, { Logger } from 'winston';

export interface LogMessage {
    message: string;
    level: string;
}

/**
 * Reference of logs
 *   logger.debug('This is a debug message.');
 *   logger.info('This is a info message');
 *   logger.warn('This is a warning message.');
 *   logger.error('This is an error message.');
 */

const logger: Logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [new winston.transports.Console()],
});

export default logger;
