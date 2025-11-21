//It defines two functions for logging messages with timestamps and exports them so you can use them in other files.
function logInfo(message) {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
}

function logError(message) {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
}

module.exports = { logInfo, logError };
