import { options } from './client';
import { getRemoteFunc } from './getRemoteFunc';
import { httpRequestExecute } from './simpleExecute';

const http = require('http');

const simpleClient = function (opts: options) {
  opts.host = opts.host || '127.0.0.1';
  if (!opts.sec) {
    opts.agent = new http.Agent({
      keepAlive: true,
      maxFreeSockets: 10,
      keepAliveMsecs: 10000
    });
  }

  return getRemoteFunc.bind(null, opts, httpRequestExecute);
};

export { simpleClient };
