import { httpRequestExecute } from './simpleExecute';

const ERRORCODE = require('../const/error');

async function rpcExecute(options, params) {
  const { log } = require('../util/Log');
  // eslint-disable-next-line prefer-rest-params
  const result = await httpRequestExecute(options, [].slice.call(arguments, 1));
  switch (result.c) {
    case ERRORCODE.SUCCESS:
      return result.o;
    default:
      log.warn('rpc error %d for %s %s', result.c, options.path, result.e);
      throw new Error(result.e);
  }
}

export { rpcExecute };
