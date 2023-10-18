const fs = require('fs');
const readline = require('readline');
const Program = require('./program');
const Band = require('./band');
const Musician = require('./musician');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class MainMenu {
  constructor() {
    this.program = new Program();
    this.loadData();
  }

  displayMenu() {
    console.log('--- Müzik Programı ---');
    console.log('1. Yeni bir Band ekleyin');
    console.log('2. Bir Band silin');
    console.log('3. Yeni bir Müzisyen ekleyin');
    console.log('4. Bir Müzisyeni silin');
    console.log('5. Müzisyeni bir Banda ekleyin');
    console.log('6. Müzisyeni bir Bandan çıkarın');
    console.log('7. Bir Müzisyenin bilgilerini görüntüleyin');
    console.log('8. Bir Bandın bilgilerini görüntüleyin');
    console.log('9. Çıkış');
  }

  handleUserInput() {
    this.displayMenu();
    rl.question('Lütfen bir seçenek seçin: ', (choice) => {
      switch (choice) {
        case '1':
          this.createBand();
          break;
        case '2':
          this.deleteBand();
          break;
        case '3':
          this.createMusician();
          break;
        case '4':
          this.deleteMusician();
          break;
        case '5':
          this.addMusicianToBand();
          break;
        case '6':
          this.removeMusicianFromBand();
          break;
        case '7':
          this.viewMusicianInfo();
          break;
        case '8':
          this.viewBandInfo();
          break;
        case '9':
          this.saveData();
          rl.close();
          break;
        default:
          console.log('Geçersiz seçenek! Lütfen tekrar deneyin.');
          this.handleUserInput();
      }
    });
  }

  createBand() {
    rl.question('Band adını girin: ', (name) => {
      rl.question('Band hakkında bilgi girin: ', (infoText) => {
        rl.question('Kuruluş yılını girin: ', (formationYear) => {
          rl.question('Dağılma yılını girin (eğer geçerliyse): ', (disbandYear) => {
            this.program.createBand(name, infoText, formationYear, disbandYear);
            console.log('Band başarıyla oluşturuldu.');
            this.handleUserInput();
          });
        });
      });
    });
  }

  deleteBand() {
    rl.question('Silmek istediğiniz Band adını girin: ', (bandName) => {
      const band = this.program.bands.find((b) => b.name === bandName);

      if (band) {
        this.program.deleteBand(band);
        console.log(`${bandName} isimli Band başarıyla silindi.`);
      } else {
        console.log('Band bulunamadı!');
      }
      this.handleUserInput();
    });
  }

  createMusician() {
    rl.question('Müzisyen adını girin: ', (name) => {
      rl.question('Müzisyen hakkında bilgi girin: ', (infoText) => {
        rl.question('Doğum yılını girin: ', (birthYear) => {
          this.program.createMusician(name, infoText, birthYear);
          console.log('Müzisyen başarıyla oluşturuldu.');
          this.handleUserInput();
        });
      });
    });
  }

}

const mainMenu = new MainMenu();
mainMenu.run();