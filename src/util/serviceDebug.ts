import debug from "debug";

type SERVICE_LOG_LEVEL = 'error' | 'info' | 'event';

const serviceDebug = (type: SERVICE_LOG_LEVEL, namespace: string, message: string) =>
  debug(`service:${namespace}:${type}`)(message);

export default serviceDebug;