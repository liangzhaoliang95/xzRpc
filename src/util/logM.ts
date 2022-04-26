let logger = {
  debug: console.debug,
  info: console.info,
  error: console.error,
  warn: console.warn
};
let logSetAble = true;
export function setLog(log) {
  if (logSetAble) {
    logger = log;
  } else {
    console.info('logger can only set at very beginning');
  }
}

export function getLog() {
  logSetAble = false;
  return logger;
}

export const log = getLog();
