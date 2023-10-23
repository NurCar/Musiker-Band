const fs = require('fs');
const Band = require('./band');

class Musician {
  constructor(name, infoText, birthYear, instruments = [], bands = []) {
    this.name = name;
    this.infoText = infoText;
    this.birthYear = birthYear;
    this.instruments = instruments;
    this.bands = bands;
    this.previousBands = [];
  }

  joinBand(bandName, joinYear, instruments) {
    const band = this.bands.find((b) => b.name === bandName);
    if (band) {
      const joinYearInt = parseInt(joinYear, 10);
      const musicianInstruments = this.getMusicianInstruments(this);
      this.bands.push({ band, joinYear: joinYearInt, instruments: musicianInstruments });
      band.addMember(this, joinYearInt, musicianInstruments);
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
        name: b.band.name,
        instruments: b.instruments,
        joinYear: b.joinYear,
        leaveYear: this.previousBands
          .filter((pb) => pb.band.name === b.band.name)
          .map((pb) => pb.leaveYear),
      })),
    };
  }
}

module.exports = Musician;