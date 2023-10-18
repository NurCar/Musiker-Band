class Band {
  constructor(name, infoText, formationYear, disbandYear = null) {
    this.name = name;
    this.infoText = infoText;
    this.formationYear = formationYear;
    this.disbandYear = disbandYear;
    this.currentMembers = [];
    this.previousMembers = [];
  }

  addMember(member, joinYear, instruments) {
    const bandMember = { member, joinYear, instruments };
    this.currentMembers.push(bandMember);
  }

  removeMember(member) {
    const index = this.currentMembers.findIndex((bm) => bm.member === member);
    if (index !== -1) {
      this.currentMembers.splice(index, 1);
    }
  }

  addPreviousMember(member, leaveYear, instruments) {
    const bandMember = { member, leaveYear, instruments };
    this.previousMembers.push(bandMember);
  }

  removePreviousMember(member) {
    const index = this.previousMembers.findIndex((bm) => bm.member === member);
    if (index !== -1) {
      this.previousMembers.splice(index, 1);
    }
  }

  getMembers() {
    return this.currentMembers.map((bm) => bm.member);
  }

  getPreviousMembers() {
    return this.previousMembers.map((bm) => bm.member);
  }
  toJSON() {
    const { name, infoText, formationYear, disbandYear, currentMembers, previousMembers } = this;
    return {
      name,
      infoText,
      formationYear,
      disbandYear,
      currentMembers: currentMembers.map((member) => ({
        member: member.member.name,
        joinYear: member.joinYear,
        instruments: member.instruments,
      })),
      previousMembers: previousMembers.map((member) => ({
        member: member.member.name,
        leaveYear: member.leaveYear,
        instruments: member.instruments,
      })),
    };
  }
}

module.exports = Band;