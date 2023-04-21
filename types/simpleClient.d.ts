/**
 * @author  zhaoliang.liang
 * @date  2023/4/21 11:09
 */

export type MethodDefine = {
  [key: string]: {
    path: string;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' | string;
  };
};

// 返回值是一个对象,对象的key为T的key遍历,值为一个函数
export declare function simpleClient(options: {
  host: string;
  sec?: boolean;
  port?: number;
}): <F>(methodDefine: MethodDefine) => F;
