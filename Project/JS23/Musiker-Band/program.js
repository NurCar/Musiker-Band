const Band = require('./band');
const Musician = require('./musician');
class Program {
  constructor() {
    this.bands = [];
    this.musicians = [];
  }

  createBand(name, infoText, formationYear, disbandYear) {
    const band = new Band(name, infoText, formationYear, disbandYear);
    this.bands.push(band);
    return band;
  }

  deleteBand(band) {
    const index = this.bands.indexOf(band);
    if (index !== -1) {
      this.bands.splice(index, 1);
    }
  }

  createMusician(name, infoText, birthYear) {
    const musician = new Musician(name, infoText, birthYear);
    this.musicians.push(musician);
    return musician;
  }

  deleteMusician(musician) {
    const index = this.musicians.indexOf(musician);
    if (index !== -1) {
      this.musicians.splice(index, 1);
    }
  }

  addMusicianToBand(band, musician, joinYear, instruments) {
    if (this.bands.includes(band) && this.musicians.includes(musician)) {
      band.addMember(musician, joinYear, instruments);
      musician.addBand(band, joinYear);
    } else {
      console.log('Geçersiz grup veya müzisyen.');
    }
  }

  removeMusicianFromBand(band, musician) {
    if (this.bands.includes(band) && this.musicians.includes(musician)) {
      band.removeMember(musician);
      musician.removeBand(band);
    } else {
      console.log('Geçersiz grup veya müzisyen.');
    }
  }

  // Diğer işlevler burada eklenebilir.

  toJSON() {
    return {
      bands: this.bands.map((band) => band.toJSON()),
      musicians: this.musicians.map((musician) => musician.toJSON()),
    };
  }
}

module.exports = Program;





