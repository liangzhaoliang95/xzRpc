import { Agent } from 'http';

import { getRemoteFunc } from './getRemoteFunc';
import { rpcExecute } from './rpcExecute';

export class options {
  port?: number;
  host?: string;
  agent?: Agent;
  method?: string;
  headers?: { [key: string]: string };
  sec?: boolean;
}

export function rpcClient(opts) {
  let options: options = {
    method: 'POST' /*,headers: {"Connection":"Keep-Alive"}*/
  };
  options.port = opts.port;
  options.host = opts.host || '127.0.0.1';
  const http = opts.sec ? require('https') : require('http');
  options.agent = new http.Agent({
    keepAlive: true,
    maxFreeSockets: 10,
    keepAliveMsecs: 10000
  });
  options = Object.assign(options, opts);
  return getRemoteFunc.bind(null, options, rpcExecute);
}
