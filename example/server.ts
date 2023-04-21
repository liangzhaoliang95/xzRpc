/**
 * @author  zhaoliang.liang
 * @date  2023/4/21 11:35
 */

import { server } from '../src';
function test(a, b, c) {
  console.log(a, b, c);
}

server.registers([
  {
    '/test': [test, 'test']
  }
]);
server.start({ port: 8081, host: '0.0.0.0' });
