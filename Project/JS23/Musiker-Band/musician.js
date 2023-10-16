class Musician {
  constructor(name, infoText, birthYear) {
    this.name = name;
    this.infoText = infoText;
    this.birthYear = birthYear;
    this.bands = []; // Şu anki gruplar
    this.previousBands = []; // Önceki gruplar
    this.instruments = []; // Çaldığı enstrümanlar
  }

  addBand(band, joinYear) {
    // Şu anki grupları eklemek için bir metot
  }

  removeBand(band) {
    // Şu anki grupları çıkarmak için bir metot
  }

  addPreviousBand(band, leaveYear) {
    // Önceki grupları eklemek için bir metot
  }

  removePreviousBand(band) {
    // Önceki grupları çıkarmak için bir metot
  }

  // Daha fazla metotlar ve özellikler eklenebilir
}