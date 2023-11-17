const fs = require('fs');
const Program = require('./program');


const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const program = new Program(rl);
program.loadDataFromJson();


program.menu();

rl.on('line', (input) => {
  switch (input) {
    case '1':
      program.createMusician();
      break;
    case '2':
      program.deleteMusician();
      break;
    case '3':
      program.createBand();
      break;
    case '4':
      program.deleteBand();
      break;
    case '5':
      program.addMusicianToBand();
      break;
    case '6':
      program.removeMusicianFromBand();
      break;
    case '7':
      program.addBandToMusician();
      break;
    case '8':
      program.removeBandFromMusician()
      break;
    case '9':
      program.viewData();
      break;
    case '10':
      program.saveDataToJson();
      rl.close();
      break;
    default:
      console.log('Invalid option. Please try again.');
      program.menu();
  }
});