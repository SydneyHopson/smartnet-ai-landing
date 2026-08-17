export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.SMARTNET_VERBOSE_LOGS === "true") return;

  const shouldSuppress = (args: unknown[]) =>
    typeof args[0] === "string" && args[0].startsWith("[SmartNET");

  const originalLog = console.log.bind(console);
  const originalInfo = console.info.bind(console);
  const originalDebug = console.debug.bind(console);
  const originalWarn = console.warn.bind(console);
  const originalError = console.error.bind(console);

  console.log = (...args: unknown[]) => {
    if (!shouldSuppress(args)) originalLog(...args);
  };

  console.info = (...args: unknown[]) => {
    if (!shouldSuppress(args)) originalInfo(...args);
  };

  console.debug = (...args: unknown[]) => {
    if (!shouldSuppress(args)) originalDebug(...args);
  };

  console.warn = (...args: unknown[]) => {
    if (!shouldSuppress(args)) originalWarn(...args);
  };

  console.error = (...args: unknown[]) => {
    if (!shouldSuppress(args)) originalError(...args);
  };
}
