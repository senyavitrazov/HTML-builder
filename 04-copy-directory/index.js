const fs = require('fs');
const path = require('path');
const copy = path.join(__dirname, 'files-copy');
const folder = path.join(__dirname, 'files');

async function copyFolder() {
  await fs.promises.rm(copy, { recursive: true, force: true });

  fs.mkdir(copy, { recursive: true }, (e) => {
    if (e) throw e;
  });

  fs.readdir(folder, (e, data) => {
    if (e) throw e;
    data.forEach(file => { fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (e) => { if (e) throw e; }); });
  });
  console.log('success!');
}

copyFolder();