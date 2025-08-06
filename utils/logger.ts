import { createWriteStream } from 'fs';

export class Logger {
  private static stream = createWriteStream('logs/test.log', { flags: 'a' });

  static info(message: string): void {
    const log = `[${new Date().toISOString()}] INFO: ${message}\n`;
    this.stream.write(log);
    console.log(log);
  }

  static error(message: string): void {
    const log = `[${new Date().toISOString()}] ERROR: ${message}\n`;
    this.stream.write(log);
    console.error(log);
  }
}