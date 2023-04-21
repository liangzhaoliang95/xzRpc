import { rpcClient } from '../src';
import { MethodDefine } from '../types/simpleClient';
const rpc = rpcClient({
  host: '127.0.0.1',
  port: 8081
});
const interfaceUrl: MethodDefine = {
  test: {
    path: `/test`,
    method: 'POST'
  }
};
//@ts-ignore
const qyWxRpcClient = rpc<any>(interfaceUrl);

async function main() {
  const rs = await qyWxRpcClient.test(1, 2, 3);
  console.log(rs);
}

main()
  .then((data) => {
    process.exit(0);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    process.exit(1);
  });
