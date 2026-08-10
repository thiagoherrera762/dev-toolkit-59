// Importing required modules
import fs from 'fs';
import path from 'path';

// Logger interface to define log level and messages
interface Logger {
  log: (level: string, message: string) => void;
}

// Logger class implementing the Logger interface
class FileLogger implements Logger {
  private logFilePath: string;
  private maxFileSize: number;
  private currentFileSize: number;

  constructor(logDir: string, maxFileSize: number) {
    this.logFilePath = path.join(logDir, 'app.log');
    this.maxFileSize = maxFileSize;
    this.currentFileSize = this.getCurrentFileSize();
  }

  // Get the current size of the log file
  private getCurrentFileSize(): number {
    return fs.existsSync(this.logFilePath) ? fs.statSync(this.logFilePath).size : 0;
  }

  // Write log messages with rotation logic
  public log(level: string, message: string): void {
    const logEntry = `${new Date().toISOString()} [${level}] ${message}\n`;
    this.currentFileSize += Buffer.byteLength(logEntry);

    if (this.currentFileSize > this.maxFileSize) {
      this.rotateLogFile();
    }

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  // Rotate the log file
  private rotateLogFile(): void {
    const rotatedFilePath = this.logFilePath.replace(/(\.log)$/, `-${Date.now()}$1`);
    fs.renameSync(this.logFilePath, rotatedFilePath);
    this.currentFileSize = 0;
  }
}

// Export an instance of the logger
const logger = new FileLogger('./logs', 1048576); // 1MB max log size
export { logger };