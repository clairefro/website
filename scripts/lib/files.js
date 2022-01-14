const fs = require('fs-extra');

function mkdirIfNotExistsSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function copySync(srcDir, destDir, opts) {
  fs.copySync(srcDir, destDir, opts);
}

function rmDirSync(dirPath) {
  let files;
  try {
    files = fs.readdirSync(dirPath);
  } catch (e) {
    return;
  }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      const filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath);
      else rmDirSync(filePath);
    }
  fs.rmdirSync(dirPath);
}

function clearDirSync(dir) {
  rmDirSync(dir);
  mkdirIfNotExistsSync(dir);
}

module.exports = {
  mkdirIfNotExistsSync,
  copySync,
  rmDirSync,
  clearDirSync
};
