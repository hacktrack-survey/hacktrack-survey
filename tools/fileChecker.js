const fs = require("fs");

function createFileIfNotExists(path, fileContent) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify(fileContent), "utf-8", (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

function doesFileExist(path) {
  return fs.existsSync(path);
}

module.exports = { createFileIfNotExists, doesFileExist };
