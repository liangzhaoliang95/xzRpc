const http = require('http');
const ERRORCODE = require('../const/error');
const server = http.createServer((req, res) => {
  let buffer;
  const { log } = require('../util/Log');
  req.on('data', function (chunk) {
    if (!buffer) {
      buffer = Buffer.from(chunk);
    } else {
      buffer = Buffer.concat([buffer, chunk]);
    }
  });
  req.on('end', async function () {
    const methodName = req.url;
    const method = allMethods[methodName];
    if (!method) {
      log.warn('no ' + methodName + ' found');
      res.end(JSON.stringify({ c: ERRORCODE.NOMETHOD }));
      return;
    }

    try {
      const { func, max } = method;
      const data = buffer.toString();
      log.info('call %s with', methodName, data);
      // log.info(`call ${methodName} with ${data}`);
      let params = '';
      try {
        params = JSON.parse(data);
      } catch (e) {
        res.end(JSON.stringify({ c: ERRORCODE.BADDATA }));
        return;
      }

      const begin = Date.now();
      const result = await func(...params);

      const delta = Date.now() - begin;
      if (delta > max) {
        method.max = delta;
      }

      method.totalTime = delta;
      method.count++;
      let resStr;
      if (result instanceof Buffer) {
        res.setHeader('content-type', 'Buffer');
        resStr = Buffer.concat([Uint8Array.from([ERRORCODE.SUCCESS]), result]);
      } else {
        resStr = Buffer.from(
          JSON.stringify({ c: ERRORCODE.SUCCESS, o: result })
        );
      }

      log.info('res %s %s ', methodName, resStr);
      res.end(resStr);
    } catch (a) {
      method.failed++;
      log.error('interal error of rpc', a);
      res.end(JSON.stringify({ c: ERRORCODE.INSERNALERROR, e: a.message }));
    }
  });
});
const allMethods = {};

// now that proxy is running
let started = false;
function register(name, func, desc) {
  const { log } = require('../util/Log');
  if (started) {
    return;
  }

  const method = allMethods[name];
  if (!method) {
    log.info('add ' + name);
    allMethods[name] = {
      name,
      desc,
      func,
      count: 0,
      max: 0,
      totalTime: 0,
      failed: 0
    };
  } else {
    log.warn('failed to add ' + name);
    //TODO报错
  }
}

function registers(funcs) {
  if (!Array.isArray(funcs)) {
    funcs = [funcs];
  }

  funcs.forEach((funcGroup) => {
    for (const key in funcGroup) {
      const func = funcGroup[key];
      register(key, func[0], func[1]);
    }
  });
}

async function __internalList__() {
  return allMethods;
}

function start(options) {
  const { log } = require('../util/Log');
  if (started) {
    return;
  }

  register('/__internalList__', __internalList__, '__internalList__');
  started = true;
  const host = options.host || '127.0.0.1';
  server.listen(options.port, host);
  server.keepAliveTimeout = 0;
  if (options.ips) {
    server.on('connection', (socket) => {
      const remoteAddress = socket.remoteAddress;
      if (options.ips.indexOf(remoteAddress) < 0) {
        log.warn(`close connection from ${remoteAddress}`);
        socket.destroy();
      }
    });
  }

  return function () {
    server.close();
  };
}

export { start, register, registers };
