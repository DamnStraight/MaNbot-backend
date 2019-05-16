import debug from "debug";

type LOG_LEVEL = "error" | "info" | "event";
type DEBUG_TYPE = "service" | "app" | "resolver";

/**
 * Creates and returns a callable debugger with specified named parameters
 *
 * @param type What part of the code the debugger is being run from, ie. service, resolver
 * @param namespace Further type specificity, ie. user resolver, emote service
 * @param logLevel The kind of output beinbg displayed, ie. info, error, event
 */
const appDebugger = (type: DEBUG_TYPE, namespace: string, logLevel: LOG_LEVEL) => debug(`${type}:${namespace}:${logLevel}`);

export default appDebugger;