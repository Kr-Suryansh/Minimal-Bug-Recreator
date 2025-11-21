//this file is included for saving files before zipping
const fs = require('fs');
const path = require('path');
const os = require('os');

function createTempDir() {
  const tempDirPath = path.join(os.tmpdir(), `mre-temp-${Date.now()}`);
  fs.mkdirSync(tempDirPath);
  return tempDirPath;
}

function cleanTempDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}

module.exports = { createTempDir, cleanTempDir };
