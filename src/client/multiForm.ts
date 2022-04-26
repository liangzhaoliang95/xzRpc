import { file } from './file';
import { json } from './json';

const boundary = 'hellothisisxzcontentdososos';
const util = require('util');
async function genFileContent(name, file) {
  const filePath = file.path,
    fileType = file.type || 'application/octet-stream';
  const path = require('path');
  const fs = require('fs');
  const fileName = path.basename(filePath);
  const readFile = util.promisify(fs.readFile);
  const content = await readFile(filePath);
  return genContent(name, content, fileType, fileName);
}

function genContent(name, content, type?: any, filename?: any) {
  let data = '--' + boundary + '\r\n';
  data += `Content-Disposition: form-data; name="${name}";`;
  if (filename) {
    data += `filename="${filename}"`;
  }

  data += '\r\n';
  if (type) {
    data += `Content-Type:${type}\r\n`;
  }

  data += '\r\n';
  return Buffer.concat([
    Buffer.from(data, 'utf8'),
    Buffer.from(content, 'binary'),
    Buffer.from('\r\n', 'utf8')
  ]);
}

export async function checkData(params) {
  let multi = false;
  for (const key in params) {
    const value = params[key];
    if (value instanceof file) {
      multi = true;
      break;
    }
  }

  if (!multi) {
    return null;
  }

  let allContent = Buffer.alloc(0);
  for (const key in params) {
    let value: any = params[key];
    if (value instanceof file) {
      value = await genFileContent(key, value);
    } else if (value instanceof json) {
      value = genContent(
        key,
        JSON.stringify(value.obj),
        'application/json',
        'json'
      );
    } else {
      value = genContent(key, '' + value);
    }

    allContent = Buffer.concat([allContent, value]);
  }

  allContent = Buffer.concat([
    allContent,
    Buffer.from('--' + boundary + '--\r\n\r\n', 'utf8')
  ]);
  return ['multipart/form-data; boundary=' + boundary, allContent];
}
