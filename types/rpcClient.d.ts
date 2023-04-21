/**
 * @author  zhaoliang.liang
 * @date  2023/4/21 11:09
 */
import { MethodDefine } from './simpleClient';

export declare function rpcClient(options: {
  host: string;
  sec?: boolean;
  port?: number;
}): <F>(methodDefine: MethodDefine) => F;
export declare function initClient(options: {
  host: string;
  sec?: boolean;
  port?: number;
}): <F>(methodDefine: MethodDefine) => F;
