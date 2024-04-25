const { log } = console;

const logInit = (message: string) => {
  log(`🔥🚀 ${message}`);
};

const logInfo = (message: string) => {
  log(`⚠️ ${message}`);
};

const logWarn = (message: string) => {
  log(`⚠️ ${message}`);
};

const logError = (message: string) => {
  log(`⛔ ${message}`);
};

export {
  logInit,
  logInfo,
  logWarn,
  logError,
};