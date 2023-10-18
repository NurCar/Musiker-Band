class Musician {
  constructor(name, infoText, birthYear) {
    this.name = name;
    this.infoText = infoText;
    this.birthYear = birthYear;
    this.bands = [];
    this.previousBands = [];
    this.instruments = [];
  }

  addBand(band, joinYear) {
    const musicianBand = { band, joinYear };
    this.bands.push(musicianBand);
  }

  removeBand(band) {
    const index = this.bands.findIndex((mb) => mb.band === band);
    if (index !== -1) {
      this.bands.splice(index, 1);
    }
  }

  addPreviousBand(band, leaveYear) {
    const musicianBand = { band, leaveYear };
    this.previousBands.push(musicianBand);
  }

  removePreviousBand(band) {
    const index = this.previousBands.findIndex((mb) => mb.band === band);
    if (index !== -1) {
      this.previousBands.splice(index, 1);
    }
  }

  addInstrument(instrument) {
    this.instruments.push(instrument);
  }

  removeInstrument(instrument) {
    const index = this.instruments.indexOf(instrument);
    if (index !== -1) {
      this.instruments.splice(index, 1);
    }
  }

  getBands() {
    return this.bands.map((mb) => mb.band);
  }

  getPreviousBands() {
    return this.previousBands.map((mb) => mb.band);
  }
  toJSON() {
    const { name, infoText, birthYear, bands } = this;
    return {
      name,
      infoText,
      birthYear,
      bands: bands.map((bandMembership) => ({
        band: bandMembership.band.name,
        joinYear: bandMembership.joinYear,
        instruments: bandMembership.instruments,
      })),
    };
  }
}

module.exports = Musician;