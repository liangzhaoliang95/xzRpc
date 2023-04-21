export declare class RpcLogger {
  info: (...message: any[]) => void;
  error: (...message: any[]) => void;
  debug: (...message: any[]) => void;
  warn: (...message: any[]) => void;
}

export declare function setRpcLog(logger: RpcLogger): void;
