const path = require('path');
const fs = require('fs');
fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, () => { });

const src = path.join(__dirname, 'assets');
const target = path.join(__dirname, 'project-dist');
const styles = fs.createWriteStream('./06-build-page/project-dist/style.css', 'utf-8');

async function copy(src, target) {
  await fs.mkdir(target, { recursive: true }, () => { });
  fs.readdir(src, { withFileTypes: true }, (error, files) => {
    if (error) throw error;
    files.forEach((file) => {
      if (file.isDirectory()) {
        copy(path.join(src, file.name), path.join(target, file.name));
      } else {
        fs.copyFile(path.join(src, file.name), path.join(target, file.name), () => { });
      }
    });
  });
};

async function copyFolder(src, target) {
  await fs.mkdir(target, { recursive: true }, () => { });
  let folder = path.join(target, 'assets');
  await copy(src, folder);
};

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
  if (error) throw error;
  files.forEach(file => {
    fs.stat(path.join(__dirname, 'styles', file.name), (error, stats) => {
      if (error) throw error;
      if (stats.isFile() && path.extname(file.name) === '.css') {
        const input = fs.createReadStream(path.join(__dirname, 'styles', file.name));
        input.on('data', chunk => styles.write(chunk + '\n'));
      }
    });
  });
});

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
  if (err) throw err;
  let template = data;
  const reg = /{{(\w+)}}/;
  let tag = template.match(reg);
  let tagName = tag[1];
  clearTag();
  function clearTag() {
    fs.readFile(path.join(__dirname, 'components', `${tagName}.html`), 'utf-8', (err, el) => {
      if (err) throw err;
      if (!el) {
        template = template.replace(reg, '');
      } else {
        template = template.replace(reg, el);
      }
      tag = template.match(reg);
      if (tag === null) {
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template, () => { });
      } else {
        tagName = tag[1];
        clearTag();
      }
    });
  }
});

copyFolder(src, target);