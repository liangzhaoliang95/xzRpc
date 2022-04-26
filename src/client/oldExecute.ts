import { httpRequestExecute } from './simpleExecute';

async function execute(options, method, params) {
  let content;
  if (typeof params == 'string') {
    content = params;
  } else {
    const keys = Object.keys(params).sort();
    const res = [];
    for (const key of keys) {
      res.push(`${key}=${encodeURIComponent(params[key])}`);
    }

    content = res.join('&');
  }

  return await httpRequestExecute(options, method, content);
}

export { execute };
