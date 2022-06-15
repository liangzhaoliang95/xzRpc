const logger = {
  debug: console.debug,
  info: console.info,
  error: console.error,
  warn: console.warn
};

class LogM {
  private logger: any = logger;
  private logSetAble = true;
  setLog(log) {
    if (this.logSetAble) {
      this.logger = log;
      this.logSetAble = false;
    } else {
      console.info('logger can only set at very beginning');
    }
  }

  getLog() {
    return this.logger;
  }
}
const logM = new LogM();
export function setLog(logger) {
  logM.setLog(logger);
}

export function getLog() {
  return logM.getLog();
}
