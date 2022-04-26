function httpRequest(options, data?: any, urlArgs?: any, cb?: any) {
  let noptions;
  let isSec;
  if (typeof options == 'string') {
    //此处是为下面的redirect准备的;
    noptions = options;
    isSec = options.startsWith('https');
  } else {
    noptions = Object.assign({}, options);
    isSec = noptions.sec;
  }

  //var sendData;
  if (Array.isArray(urlArgs)) {
    let path = noptions.path;
    urlArgs.forEach((value, index) => {
      const re = new RegExp('\\{' + index + '\\}', 'gm');
      path = path.replace(re, value);
    });
    noptions.path = path;
  }

  if (noptions.method === 'GET' && data) {
    if (noptions.path.indexOf('?') >= 0) {
      noptions.path = noptions.path + '&' + data;
    } else {
      noptions.path = noptions.path + '?' + data;
    }

    data = undefined;
  }

  // eslint-disable-next-line prefer-rest-params
  const lastParameter = arguments[arguments.length - 1];
  if (typeof lastParameter == 'function') {
    cb = lastParameter;
  }

  const http = isSec ? require('https') : require('http');
  const req = http.request(noptions, (res) => {
    let buffer;
    res.on('data', (chunk) => {
      if (!buffer) {
        buffer = chunk;
      } else {
        buffer = Buffer.concat([buffer, chunk]);
      }
    });
    res.on('end', () => {
      const resType =
        noptions.dataType || res.headers['content-type'] || 'json';
      let result;
      if (resType.indexOf('json') != -1) {
        result = JSON.parse(buffer.toString());
      } else if (resType.indexOf('text') != -1) {
        result = buffer.toString();
      } else if (resType.indexOf('Buffer') != -1) {
        result = { c: buffer.readUInt8(0), o: buffer.subarray(1) };
      } else {
        result = buffer;
      }

      if (res.statusCode == 302) {
        result = res.headers['location'];
        if (noptions.redirect) {
          httpRequest(result)
            .then(function (result) {
              if (cb) {
                cb(null, result);
              } else {
                accept(result);
              }
            })
            .catch(reject);
          return;
        }
      } else if (res.statusCode != 200) {
        reject(
          new Error(
            `call ${noptions.path} result:${
              res.statusCode
            } with body=${buffer.toString()}`
          )
        );
        return;
      }

      if (cb) {
        cb(null, result);
      } else {
        accept(result);
      }
    });
  });

  // write data to request body
  let accept;
  let reject = cb;
  req.end(data);
  let promise;
  if (!cb) {
    promise = new Promise((a, r) => {
      (accept = a), (reject = r);
    });
  }

  req.on('error', reject);
  req.on('timeout', () => {
    req.abort();
  });
  return promise; //如果有回调函 return 值没有意义,所以可以返回undefined;
}

export { httpRequest };
