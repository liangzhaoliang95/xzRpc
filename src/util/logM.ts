import { RpcLogger } from '../../types/logger';

const logger: RpcLogger = {
  debug: console.debug,
  info: console.info,
  error: console.error,
  warn: console.warn
};
class Logger {
  private logger: RpcLogger = logger;
  private logSetAble = true;
  private static instance: Logger;

  setLog(logger: RpcLogger) {
    if (this.logSetAble) {
      this.logger = logger;
      this.logSetAble = false;
    } else {
      console.info('logger can only set at very beginning');
    }
  }

  getLog() {
    return this.logger;
  }
  static getInstance() {
    return this.instance || (this.instance = new Logger());
  }
}

export function setRpcLog(logger: RpcLogger) {
  Logger.getInstance().setLog(logger);
}

export function getLog() {
  return Logger.getInstance().getLog();
}
