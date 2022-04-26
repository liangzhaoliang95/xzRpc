import { checkData } from './multiForm';
import { httpRequest } from './request';

function urlencode(params) {
  const keys = Object.keys(params).sort();
  const res = [];
  for (const key of keys) {
    res.push(`${key}=${encodeURIComponent(params[key])}`);
  }

  return res.join('&');
}

async function httpRequestExecute(
  options,
  params,
  urlArgs?: any,
  headers?: any
) {
  const noption = Object.assign({}, options);
  let content;
  if (typeof params != 'string') {
    if (noption.method == 'GET') {
      content = urlencode(params);
    } else {
      noption.method = 'POST';
      const multiInfo = await checkData(params);
      if (multiInfo) {
        if (noption.headers) {
          noption.headers = Object.assign({}, noption.headers);
        } else {
          noption.headers = {};
        }

        noption.headers['Content-Type'] = multiInfo[0];
        content = multiInfo[1];
      } else if (noption.old) {
        content = urlencode(params);
      } else {
        content = JSON.stringify(params);
      }
    }
  } else {
    content = params;
  }

  if (headers) {
    if (!noption.headers) {
      noption.headers = {};
    }

    noption.headers = Object.assign(noption.headers, headers);
  }

  return await httpRequest(noption, content, urlArgs);
}

export { httpRequestExecute };
