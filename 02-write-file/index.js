const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { stdin: input, stdout } = require('process');

const output = fs.createWriteStream(path.join(__dirname, 'destination.txt'), { flags: 'a' });

const rl = readline.createInterface({ input, output });

stdout.write('Enter ur text(приглашение на ввод текста):\n> ');

rl.on('line', (input) => {
  if (input == 'exit') {
    rl.close();
  } else {
    stdout.write('> ');
    output.write(input += "\n");
  }
});

process.on('SIGINT', () => {
  console.log('\nBye-bye!(прощальная фраза)');
  process.exit();
})
rl.on('close', () => console.log("Chao!(тоже прощальная фраза)"));