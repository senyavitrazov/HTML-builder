const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const output = require('fs').createWriteStream(path.join(__dirname, "project-dist/bundle.css"));
const stylePath = path.join(__dirname, 'styles');

fsPromises
  .readdir(stylePath)
  .then(async (file) => {
    file.forEach(async (file) => {
      const filePath = path.join(stylePath, file);
      const fileName = path.basename(filePath);
      const ext = path.extname(filePath);
      if (ext == ".css") {
        const input = fs.createReadStream(path.join(stylePath, fileName));
        input.on('data', data => {
          output.write(data.toString() + '\n');
        });
      }
    });
  });