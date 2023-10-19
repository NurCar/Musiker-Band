const fs = require('fs');
const Program = require('./program');
const Musician = require('./musician');
const Band = require('./band');

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const program = new Program(rl);
program.loadDataFromJson();

const menu = () => {
  console.log('** Music Program **');
  console.log('1. Create a New Musician');
  console.log('2. Delete a Musician');
  console.log('3. Create a New Band');
  console.log('4. Delete a Band');
  console.log('5. Add a Musician to a Band');
  console.log('6. Remove a Musician from a Band');
  console.log('7. View Data');
  console.log('8. Exit');
};
menu();

rl.on('line', (input) => {
  switch (input) {
    case '1':
      rl.question("Musician's Name: ", (name) => {
        rl.question('Info: ', (infoText) => {
          rl.question('Birth Year: ', (birthYear) => {
            rl.question('Enter the Instruments Played (separated by commas): ', (instruments) => {
              const instrumentList = instruments.split(',').map((i) => i.trim());
              program.createMusician(name, infoText, parseInt(birthYear, 10), instrumentList);
              console.log('Musician created successfully.');
              menu();
            });
          });
        });
      });
      break;
    case '2':
      // Delete a Musician
      rl.question('Enter the Name of the Musician to Delete: ', (name) => {
        program.deleteMusician(name);
        console.log('Musician deleted successfully.');
        menu();
      });
      break;
    case '3':
      // Create a New Band
      rl.question('Band Name: ', (name) => {
        rl.question('Info: ', (infoText) => {
          rl.question('Formation Year: ', (formationYear) => {
            rl.question('Disband Year (leave it empty if still active): ', (disbandYear) => {
              if (disbandYear.trim() === '') {
                disbandYear = null;
              } else {
                disbandYear = parseInt(disbandYear, 10);
              }
              program.createBand(name, infoText, parseInt(formationYear, 10), disbandYear);
              console.log('Band created successfully.');
              menu();
            });
          });
        });
      });
      break;
    case '4':
      // Delete a Band
      rl.question('Enter the Name of the Band to Delete: ', (name) => {
        program.deleteBand(name);
        console.log('Band deleted successfully.');
        menu();
      });
      break;
    case '5':
      rl.question('Musician Name: ', (musicianName) => {
        rl.question('Band Name to add to: ', (bandName) => {
          rl.question('Is this a current member (yes/no): ', (answer) => {
            answer = answer.trim().toLowerCase();
            if (answer === 'yes') {
              program.addMusicianToBand(musicianName, bandName, 'yes');
              menu();
            } else if (answer === 'no') {
              rl.question('Enter the year they left: ', (leaveYear) => {
                program.addMusicianToBand(musicianName, bandName, 'no', parseInt(leaveYear, 10));
                menu();
              });
            } else {
              console.log('Invalid response. Please enter "yes" or "no."');
              menu();
            }
          });
        });
      });
      break;
    case '6':
      rl.question('Musician\'s Name: ', (musicianName) => {
        rl.question('Name of the Band to Remove from: ', (bandName) => {
          rl.question('Enter the Year Left: ', (leaveYear) => {
            program.removeMusicianFromBand(musicianName, bandName, parseInt(leaveYear, 10));
            menu();
          });
        });
      });
      break;
    case '7':
      // View Data
      rl.question('View data for Musicians (M) or Bands (B): ', (dataType) => {
        dataType = dataType.trim().toLowerCase();
        if (dataType === 'm') {
          program.showData('musician');
        } else if (dataType === 'b') {
          program.showData('band');
        } else {
          console.log('Invalid option. Please enter "M" or "B".');
        }
        menu();
      });
      break;
    case '8':
      // Exit the program
      program.saveDataToJson();
      rl.close();
      break;
    default:
      console.log('Invalid option. Please try again.');
      menu();
  }
});