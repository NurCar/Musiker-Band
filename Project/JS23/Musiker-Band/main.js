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

}