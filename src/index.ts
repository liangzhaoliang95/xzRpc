import { rpcClient } from './client/client';
import { file } from './client/file';
import { json } from './client/json';
import { simpleClient } from './client/simpleClient';
import * as server from './server/server';
import { setLog } from './util/logM';

module.exports = {
  server: server,
  initClient: rpcClient,
  simpleClient: simpleClient,
  file: file,
  json: json,
  setLog: setLog
};
