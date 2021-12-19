let fs = require('fs');
var readlineSync = require('readline-sync');
let ram = new Array();

let arg = process.argv;

let text;
try {
    text = fs.readFileSync(arg[2]).toString();
} catch (err) {
    console.err(err);
}
ram = text.split(/\s+/);

ram.unshift(0);
let ip = 1;

while(ip < ram.length - 1) {
  switch(ram[ip]) {
    case 'input':
      ram[ram[ip + 1]] = parseInt(readlineSync.prompt());
      ip += 2;
      break;
    case 'output':
      console.log(ram[ram[ip + 1]]);
      ip += 2;
      break;
    case 'install':
      ram[ram[ip + 1]] = parseInt(ram[ip + 2]);
      ip += 3;
      break;
    case 'add':
      ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) + parseInt(ram[ram[ip + 2]]);
      ip += 4;
      break;
    case 'sub':
      ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) - parseInt(ram[ram[ip + 2]]);
      ip += 4;
      break;
    case 'mul':
      ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) * parseInt(ram[ram[ip + 2]]);
      ip += 4;
      break;
    case 'label':
      ip += 2;
      break;
    case 'compare':
      let val = ram[ram[ip + 1]] - ram[ram[ip + 2]]
      if (val > 0)
        ram[0] = 1;
      else if (val < 0)
        ram[0] = -1;
      else
        ram[0] = 0;
      ip += 3
      break;
    case 'equel':
      if (ram[0] == 0)
        ip = getIndex(ram[ip + 1]) + 1;
      else
        ip += 2;
      break;
    case 'less':
      if (ram[0] == -1)
        ip = getIndex(ram[ip + 1]) + 1;
      else
        ip += 2;
      break;
    case 'jump':
      ip = getIndex(ram[ip + 1]) + 1;
      break;
    default:
      throw new Error(`Syntax error`);
  }


  function getIndex(nameLabel) {
    let stIndex = 0;
    let index = 0;
    while (true) {
      index = ram.indexOf(nameLabel, stIndex);
      if (ram[index - 1] == 'label')
        break;
      stIndex = index + 1;
    }
    return index;
  }
}