/**
 * @author  zhaoliang.liang
 * @date  2023/4/21 11:09
 */

type registerContent = {
  [key: string]: [Function, string];
};

export declare namespace server {
  export function start(options: { port: number; host: string }): any;
  export function register(name: string, func: Function, desc: string): void;
  export function registers(func: registerContent[]): void;
}
