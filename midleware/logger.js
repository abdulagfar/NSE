import winston from 'winston'

// styling and formating logs
const logFormat = winston.format.combine(
    winston.format.colorize(), 
    winston.format.timestamp(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
);

// storing logs into a file 
 const logconfiguration = {
    format: logFormat,
     'transports' : [
        new winston.transports.File({
            filename: './logs/debug.log',
        }),
       new winston.transports.Console({
       }),
     ],
 };
 

 
 const logger = winston.createLogger(logconfiguration);
 
 logger.stream = { 
    write: function(message, encoding){ 
      logger.info(message); 
    } }


 export default logger