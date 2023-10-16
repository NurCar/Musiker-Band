const fs = require("fs");
class Band {
  constructor(name, infoText, formationYear, disbandYear) {
    this.name = name;
    this.infoText = infoText;
    this.formationYear = formationYear;
    this.disbandYear = disbandYear;
    this.members = [];
    this.previousMembers = [];
  }
  addMember(member, joinYear, instruments) {
    // Şu anki üyeleri eklemek için bir metot
  }

  removeMember(member) {
    // Şu anki üyeleri çıkarmak için bir metot
  }

  addPreviousMember(member, leaveYear, instruments) {
    // Önceki üyeleri eklemek için bir metot
  }

  removePreviousMember(member) {
    // Önceki üyeleri çıkarmak için bir metot
  }

  // Daha fazla metotlar ve özellikler eklenebilir
}