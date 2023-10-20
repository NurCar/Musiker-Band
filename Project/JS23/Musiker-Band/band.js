const fs = require('fs');
const Musician = require('./musician');

class Band {
  constructor(name, infoText, formationYear, disbandYear) {
    this.name = name;
    this.infoText = infoText;
    this.formationYear = formationYear;
    this.disbandYear = disbandYear;
    this.currentMembers = [];
    this.previousMembers = [];
  }

  addMember(member, joinYear, instruments) {
    this.currentMembers.push({ member, joinYear, instruments });
    member.joinBand(this.name, joinYear, instruments);
  }

  removeMember(member, leaveYear) {
    this.previousMembers.push({ member, leaveYear });
    this.currentMembers = this.currentMembers.filter((m) => m.member !== member);
    member.leaveBand(this.name, leaveYear);
  }


  toJSON() {
    return {
      name: this.name,
      infoText: this.infoText,
      formationYear: this.formationYear,
      disbandYear: this.disbandYear,
      currentMembers: this.currentMembers.map((memberInfo) => {
        const memberJSON = (typeof memberInfo.member.toJSON === 'function') ? memberInfo.member.toJSON() : memberInfo.member;
        return {
          member: memberJSON,
          instruments: memberInfo.instruments,
        };
      }),
      previousMembers: this.previousMembers,
    };
  }
}
module.exports = Band;