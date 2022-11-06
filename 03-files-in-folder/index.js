const fs = require('fs');
const path = require('path');
const { stdout: output } = require('process');


fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (error, files) => {
  if (error) throw error.message;
  output.write("  NAME\t  \t EXT\t  \t   SIZE\n");
  files.forEach((file) => {
    if (file.isFile()) {
      fs.stat(path.join(__dirname, 'secret-folder', file.name), (error, stats) => {
        if (error) throw err.message;
        const point = file.name.lastIndexOf('.');
        output.write(`${file.name.slice(0, point)}\t - \t${file.name.slice(point)}\t - \t${stats.size} bytes\n`);
      });
    }
  });
});