const fs = require('fs');
const Musician = require('./musician');
const Band = require('./band');
const readline = require('readline');

class Program {
  constructor(rl) {
    this.musicians = [];
    this.bands = [];
    this.rl = rl;
    this.loadDataFromJson();
  }

  createMusician(name, infoText, birthYear, instruments) {
    const musician = new Musician(name, infoText, birthYear);
    musician.instruments = instruments;
    this.musicians.push(musician);
    this.saveDataToJson();
    console.log('Musician created successfully.');
  }

  deleteMusician(name) {
    const musician = this.musicians.find((m) => m.name === name);
    if (musician) {
      this.musicians = this.musicians.filter((m) => m.name !== name);
      this.bands.forEach((band) => {
        band.currentMembers = band.currentMembers.filter((member) => member.member.name !== name);
        band.previousMembers = band.previousMembers.filter((member) => member.member.name !== name);
      });
      this.saveDataToJson();
      console.log('Musician deleted successfully.');
    } else {
      console.log('Musician not found.');
    }
  }

  createBand(name, infoText, formationYear, disbandYear) {
    const band = new Band(name, infoText, formationYear, disbandYear);
    this.bands.push(band);
    this.saveDataToJson();
    console.log('Band created successfully.');
  }

  deleteBand(name) {
    const band = this.bands.find((b) => b.name === name);
    if (band) {
      this.bands = this.bands.filter((b) => b.name !== name);
      this.musicians.forEach((musician) => {
        musician.bands = musician.bands.filter((b) => b.name !== name);
      });
      this.saveDataToJson();
      console.log('Band deleted successfully.');
    } else {
      console.log('Band not found.');
    }
  }

  addMusicianToBand(musicianName, bandName, isCurrentMember, instruments) {
    try {
      const musician = this.musicians.find((m) => m.name.toLowerCase() === musicianName.toLowerCase());
      const band = this.bands.find((b) => b.name.toLowerCase() === bandName.toLowerCase());

      if (musician && band) {
        if (isCurrentMember === 'yes') {
          band.addMember(musician, new Date().getFullYear(), instruments);
          musician.joinBand(bandName, new Date().getFullYear(), instruments);
          this.saveDataToJson();
          console.log('Musician added to the band successfully.');
        } else if (isCurrentMember === 'no') {
          this.rl.question('Enter the year they left: ', (leaveYear) => {
            band.removeMember(musician, parseInt(leaveYear, 10));
            musician.leaveBand(bandName, parseInt(leaveYear, 10));
            this.saveDataToJson();
            console.log('Musician removed from the band.');
            menu();
          });
          return;
        } else {
          console.log('Invalid response. Please enter "yes" or "no.');
          menu();
        }
      } else {
        console.log('Musician or band not found.');
        menu();
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }


  removeMusicianFromBand(musicianName, bandName, leaveYear) {
    const musician = this.musicians.find((m) => musicianName.toLowerCase() === m.name.toLowerCase());
    const band = this.bands.find((b) => bandName.toLowerCase() === b.name.toLowerCase());

    if (musician && band) {
      if (leaveYear) {
        band.previousMembers.push({ member: musician, leaveYear });
      }
      band.currentMembers = band.currentMembers.filter(
        (member) => member.member.name.toLowerCase() !== musicianName.toLowerCase()
      );
      musician.bands = musician.bands.filter((b) => b.name.toLowerCase() !== bandName.toLowerCase());

      this.saveDataToJson();
      console.log('Musician removed from the band successfully.');
    } else {
      console.log('Musician or band not found.');
    }
  }

  showData(type) {
    if (type === 'musician') {
      if (this.musicians.length === 0) {
        console.log('No musicians found.');
      } else {
        console.log('** Musicians **');
        this.musicians.forEach((musician) => {
          console.log(`Name: ${musician.name}`);
          console.log(`Info: ${musician.infoText}`);
          console.log(`Birth Year: ${musician.birthYear}`);
          console.log(`Instruments Played: ${musician.instruments.join(', ')}`);
          console.log('------------------------------------');
        });
      }
    } else if (type === 'band') {
      if (this.bands.length === 0) {
        console.log('No bands found.');
      } else {
        console.log('** Bands **');
        this.bands.forEach((band) => {
          console.log(`Band Name: ${band.name}`);
          console.log(`Info: ${band.infoText}`);
          console.log(`Formation Year: ${band.formationYear}`);
          console.log(`Disband Year: ${band.disbandYear || 'Ongoing'}`);
          console.log('Members:');

          if (band.currentMembers.length === 0 && band.previousMembers.length === 0) {
            console.log('  - No current members.');
          } else {
            console.log('  - Members:');
            band.currentMembers.forEach((memberInfo) => {
              console.log(`    - ${memberInfo.member.name}`);
            });

            if (band.previousMembers.length > 0) {
              console.log('  - Previous Members:');
              band.previousMembers.forEach((previousMember) => {
                console.log(`    - ${previousMember.member.name} (Left: ${previousMember.leaveYear})`);
              });
            }
          }
          console.log('------------------------------------');
        });
      }
    }
  }

  saveDataToJson() {
    const jsonData = {
      musicians: this.musicians.map((musician) => musician.toJSON()),
      bands: this.bands.map((band) => band.toJSON()),
    };
    const jsonDataString = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync('data.json', jsonDataString);
  }

  toJSON() {
    return {
      musicians: this.musicians,
      bands: this.bands,
    };
  }

  loadMusicians(musicians) {
    this.musicians = musicians.map((musicianData) => {
      const musician = new Musician(
        musicianData.name,
        musicianData.infoText,
        musicianData.birthYear,
        musicianData.instruments
      );
      musician.bands = musicianData.bands;
      musician.previousBands = musicianData.previousBands;
      return musician;
    });
  }

  loadBands(bands) {
    this.bands = bands.map((bandData) => {
      const band = new Band(
        bandData.name,
        bandData.infoText,
        bandData.formationYear,
        bandData.disbandYear
      );
      band.currentMembers = bandData.currentMembers;
      band.previousMembers = bandData.previousMembers;
      return band;
    });
  }

  loadDataFromJson() {
    try {
      const data = fs.readFileSync('data.json', 'utf8');
      const parsedData = JSON.parse(data);
      this.loadMusicians(parsedData.musicians);
      this.loadBands(parsedData.bands);
    } catch (error) {
      console.log('Data file not found or cannot be read.');
    }
  }

}

module.exports = Program;




