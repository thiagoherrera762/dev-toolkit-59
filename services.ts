import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';

const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, 'app.log');

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: logFile }),
        new transports.Console()
    ]
});

const rotateLogs = () => {
    const oldLogFile = path.join(logDir, `app-${new Date().toISOString().split('T')[0]}.log`);
    fs.renameSync(logFile, oldLogFile);
    fs.writeFileSync(logFile, '');
};

setInterval(rotateLogs, 24 * 60 * 60 * 1000);

export default logger;
