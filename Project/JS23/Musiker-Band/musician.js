const fs = require('fs');
const Band = require('./band');

class Musician {
  constructor(name, infoText, birthYear) {
    this.name = name;
    this.infoText = infoText;
    this.birthYear = birthYear;
    this.instruments = [];
    this.bands = [];
    this.previousBands = [];

  }

  joinBand(bandName, joinYear, instruments) {
    const band = this.bands.find((b) => b.name === bandName);
    if (band) {
      const joinYearInt = parseInt(joinYear, 10);
      this.bands.push({ band, joinYear: joinYearInt, instruments: instruments });
      band.addMember(this, joinYearInt, instruments);
    } else {
      console.log('Band not found.');
    }
  }

  leaveBand(bandName, leaveYear) {
    const band = this.bands.find((b) => b.name === bandName);
    if (band) {
      const leaveYearInt = parseInt(leaveYear, 10);
      this.previousBands.push({ band, leaveYear: leaveYearInt });
      band.removeMember(this, leaveYearInt);
    } else {
      console.log('Band not found.');
    }
  }

  toJSON() {
    return {
      name: this.name,
      infoText: this.infoText,
      birthYear: this.birthYear,
      instruments: this.instruments,
      bands: this.bands.map((b) => ({
        name: b.name,
        instruments: b.instruments,
      })),
    };
  }
}

module.exports = Musician;