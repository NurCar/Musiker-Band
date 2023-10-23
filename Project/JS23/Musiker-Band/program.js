const fs = require('fs');
const Musician = require('./musician');
const Band = require('./band');
const readline = require('readline');


class Program {
  constructor(rl) {
    this.data = {
      musicians: [],
      bands: [],
    };
    this.musicians = [];
    this.bands = [];
    this.rl = rl;
    this.loadDataFromJson();
  }

  menu() {
    console.log('** Music Program **');
    console.log('1. Create a New Musician');
    console.log('2. Delete a Musician');
    console.log('3. Create a New Band');
    console.log('4. Delete a Band');
    console.log('5. Add a Musician to a Band');
    console.log('6. Remove a Musician from a Band');
    console.log('7. Add a Band to a Musician');
    console.log('8. Remove a Band from a Musician');
    console.log('9. View Data');
    console.log('10. Exit');
  };

  createMusician() {
    const askName = () => {
      this.rl.question("Musician's Name: ", (name) => {
        if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
          console.log('Invalid name. Name should only contain letters, numbers, and spaces.');
          askName();
        } else {
          const askInfo = () => {
            this.rl.question('Info: ', (infoText) => {
              if (!/.+/.test(infoText)) {
                console.log('Invalid info text. Info should not be empty.');
                askInfo();
              } else {
                const askBirthYear = () => {
                  this.rl.question('Birth Year: ', (birthYear) => {
                    if (!/^\d{4}$/.test(birthYear)) {
                      console.log('Invalid birth year format. Please enter a 4-digit year.');
                      askBirthYear();
                    } else {
                      const currentYear = new Date().getFullYear();
                      if (birthYear < 1900 || birthYear > currentYear) {
                        console.log('Invalid birth year. Please enter a valid birth year between 1900 and the current year.');
                        askBirthYear();
                      } else {
                        const askInstruments = () => {
                          this.rl.question('Enter the Instruments Played (separated by commas): ', (instruments) => {
                            const instrumentList = instruments.split(',').map((i) => i.trim());
                            if (instrumentList.some((instrument) => !/^[a-zA-Z\s,]+$/.test(instrument))) {
                              console.log('Invalid instrument name. Instruments should only contain letters, spaces, and commas.');
                              askInstruments();
                            } else {
                              const musician = new Musician(name, infoText, parseInt(birthYear, 10), instrumentList);
                              this.musicians.push(musician);
                              this.saveDataToJson();
                              console.log('Musician created successfully.');
                              this.menu();
                            }
                          });
                        };
                        askInstruments();
                      }
                    }
                  });
                };
                askBirthYear();
              }
            });
          };
          askInfo();
        }
      });
    };

    askName();
  }
  deleteMusician() {
    const askForName = () => {
      this.rl.question("Enter the Name of the Musician to Delete: ", (name) => {
        if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
          console.log("Invalid name. Name should only contain letters, numbers, and spaces.");
          askForName();
        } else {
          this.performDelete(name);
        }
      });
    };

    askForName();
  }

  performDelete(name) {
    const musician = this.musicians.find((m) => m.name === name);
    if (musician) {
      this.musicians = this.musicians.filter((m) => m.name !== name);
      this.bands.forEach((band) => {
        band.currentMembers = band.currentMembers.filter((member) => member.member.name !== name);
        band.previousMembers = band.previousMembers.filter((member) => member.member.name !== name);
      });
      this.saveDataToJson();
      console.log("Musician deleted successfully.");
    } else {
      console.log("Musician not found.");
      this.menu();
    }
  }

  createBand() {
    const askName = () => {
      this.rl.question('Band Name: ', (name) => {
        if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
          console.log('Invalid name. Name should only contain letters, numbers, and spaces.');
          askName();
        } else {
          const askInfo = () => {
            this.rl.question('Info: ', (infoText) => {
              if (!/.+/.test(infoText)) {
                console.log('Invalid info text. Info should not be empty.');
                askInfo();
              } else {
                const askFormationYear = () => {
                  this.rl.question('Formation Year: ', (formationYear) => {
                    if (!/^\d{4}$/.test(formationYear)) {
                      console.log('Invalid formation year format. Please enter a 4-digit year.');
                      askFormationYear();
                    } else {
                      const currentYear = new Date().getFullYear();
                      if (formationYear < 1900 || formationYear > currentYear) {
                        console.log('Invalid formation year. Please enter a valid year between 1900 and the current year.');
                        askFormationYear();
                      } else {
                        const askDisbandYear = () => {
                          this.rl.question('Disband Year (leave it empty if still active): ', (disbandYear) => {
                            if (disbandYear.trim() === '') {
                              disbandYear = null;
                            } else {
                              disbandYear = parseInt(disbandYear, 10);
                            }
                            const band = new Band(name, infoText, parseInt(formationYear, 10), disbandYear);
                            this.bands.push(band);
                            this.saveDataToJson();
                            console.log('Band created successfully.');
                            this.menu();
                          });
                        };
                        askDisbandYear();
                      }
                    }
                  });
                };
                askFormationYear();
              }
            });
          };
          askInfo();
        }
      });
    };
    askName();
  }

  deleteBand() {
    const deleteBandName = () => {
      this.rl.question('Enter the Name of the Band to Delete: ', (name) => {
        if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
          console.log('Invalid band name. Name should only contain letters, numbers, and spaces.');
          deleteBandName();
          return;
        }

        const bandToDelete = this.bands.find((band) => band.name === name);

        if (bandToDelete) {
          this.bands = this.bands.filter((band) => band.name !== name);
          this.saveDataToJson();
          console.log('Band deleted successfully.');
        } else {
          console.log('Band not found.');
        }

        this.menu();
      });
    };
    deleteBandName();
  }

  addMusicianToBand() {
    this.rl.question("Musician Name: ", (musicianName) => {
      if (!/^[a-zA-Z0-9\s]+$/.test(musicianName)) {
        console.log('Invalid musician name. Name should only contain letters, numbers, and spaces.');
        this.menu();
        return;
      }

      this.rl.question("Band Name to add to: ", (bandName) => {
        if (!/^[a-zA-Z0-9\s]+$/.test(bandName)) {
          console.log('Invalid band name. Name should only contain letters, numbers, and spaces.');
          this.menu();
          return;
        }

        const musician = this.musicians.find((m) => m.name === musicianName);
        const band = this.bands.find((b) => b.name === bandName);

        if (!musician) {
          console.log('Musician not found.');
          this.menu();
        } else if (!band) {
          console.log('Band not found.');
          this.menu();
        } else {
          this.rl.question('Enter the year they left (leave it empty if still active): ', (leaveYear) => {
            if (leaveYear.trim() === '') {
              leaveYear = null;
            } else if (!/^\d{4}$/.test(leaveYear)) {
              console.log('Invalid leave year. Please enter a 4-digit year.');
              this.menu();
              return;
            }

            if (leaveYear === null) {
              // Eğer ayrılma yılı girilmediyse, bu bir "current member"dir.
              band.currentMembers.push({ member: musician });
            } else {
              // Ayrılma yılı girildiyse, bu bir "previous member"dir.
              band.previousMembers.push({ member: musician, leaveYear });
            }

            this.saveDataToJson();
            console.log('Musician added to the band successfully.');
            this.menu();
          });
        }
      });
    });
  }

  removeMusicianFromBand() {
    this.rl.question("Musician's Name: ", (musicianName) => {
      if (!/^[a-zA-Z0-9\s]+$/.test(musicianName)) {
        console.log('Invalid musician name. Name should only contain letters, numbers, and spaces.');
        this.menu();
        return;
      }

      this.rl.question('Name of the Band to Remove from: ', (bandName) => {
        if (!/^[a-zA-Z0-9\s]+$/.test(bandName)) {
          console.log('Invalid band name. Name should only contain letters, numbers, and spaces.');
          this.menu();
          return;
        }

        const musician = this.musicians.find((m) => m.name === musicianName);
        const band = this.bands.find((b) => b.name === bandName);

        if (!musician) {
          console.log('Musician not found.');
          this.menu();
        } else if (!band) {
          console.log('Band not found.');
          this.menu();
        } else {
          // Check if the musician is a current member of the band
          const currentIndex = band.currentMembers.findIndex((memberInfo) => memberInfo.member === musician);

          if (currentIndex !== -1) {
            band.currentMembers.splice(currentIndex, 1);
            this.saveDataToJson();
            console.log('Musician removed from the band successfully.');
          } else {
            // Check if the musician is a previous member of the band
            const previousIndex = band.previousMembers.findIndex((memberInfo) => memberInfo.member === musician);

            if (previousIndex !== -1) {
              band.previousMembers.splice(previousIndex, 1);
              this.saveDataToJson();
              console.log('Musician removed from the previous members list of the band successfully.');
            } else {
              console.log('Musician is not a member of the band.');
            }
          }
          this.menu();
        }
      });
    });
  }

  addBandToMusician() {
    this.rl.question("Musician Name: ", (musicianName) => {
      if (!/^[a-zA-Z0-9\s]+$/.test(musicianName)) {
        console.log('Invalid musician name. Name should only contain letters, numbers, and spaces.');
        this.menu();
        return;
      }

      this.rl.question("Band Name to add: ", (bandName) => {
        if (!/^[a-zA-Z0-9\s]+$/.test(bandName)) {
          console.log('Invalid band name. Name should only contain letters, numbers, and spaces.');
          this.menu();
          return;
        }

        const musician = this.musicians.find((m) => m.name === musicianName);
        const band = this.bands.find((b) => b.name === bandName);

        if (!musician) {
          console.log('Musician not found.');
          this.menu();
        } else if (!band) {
          console.log('Band not found.');
          this.menu();
        } else {
          // Add the band to the musician
          if (!musician.bands.find((b) => b.band === band)) {
            musician.bands.push({ band });
            this.saveDataToJson();
            console.log('Band added to the musician successfully.');
          } else {
            console.log('Musician is already a member of the band.');
          }
          this.menu();
        }
      });
    });
  }
  removeBandFromMusician() {
    this.rl.question("Musician Name: ", (musicianName) => {
      if (!/^[a-zA-Z0-9\s]+$/.test(musicianName)) {
        console.log('Invalid musician name. Name should only contain letters, numbers, and spaces.');
        this.menu();
        return;
      }

      this.rl.question("Band Name to remove: ", (bandName) => {
        if (!/^[a-zA-Z0-9\s]+$/.test(bandName)) {
          console.log('Invalid band name. Name should only contain letters, numbers, and spaces.');
          this.menu();
          return;
        }

        const musician = this.musicians.find((m) => m.name === musicianName);
        const band = this.bands.find((b) => b.name === bandName);

        if (!musician) {
          console.log('Musician not found.');
          this.menu();
        } else if (!band) {
          console.log('Band not found.');
          this.menu();
        } else {
          // Remove the band from the musician
          const index = musician.bands.findIndex((b) => b.band === band);

          if (index !== -1) {
            musician.bands.splice(index, 1);
            this.saveDataToJson();
            console.log('Band removed from the musician successfully.');
          } else {
            console.log('Musician is not a member of the band.');
          }
          this.menu();
        }
      });
    });
  }

  viewData() {
    this.rl.question('View data for Musicians (M) or Bands (B): ', (dataType) => {
      if (dataType.toLowerCase() === 'm') {
        this.viewMusicians();
      } else if (dataType.toLowerCase() === 'b') {
        this.viewBands();
      } else {
        console.log('Invalid option. Please try again.');
      }
    });
  }

  viewMusicians() {
    console.log('** All Musicians **');
    if (this.musicians && this.musicians.length > 0) {
      this.musicians.forEach((musician) => {
        console.log(`Name: ${musician.name}`);
        console.log(`Info: ${musician.infoText}`);
        console.log(`Birth Year: ${musician.birthYear}`);
        console.log(`Instruments Played: ${musician.instruments.join(', ')}`);
        console.log('Bands:');
        if (musician.bands && musician.bands.length > 0) {
          musician.bands.forEach((bandInfo) => {
            if (bandInfo.band && bandInfo.band.name) {
              console.log(`  - Band: ${bandInfo.band.name}`);
              console.log(`    Joined Year: ${bandInfo.joinYear}`);
              console.log(`    Instruments Played: ${bandInfo.instruments.join(', ')}`);
            }
          });
        } else {
          console.log('  No current bands.');
        }
        console.log('Previous Bands:');
        if (musician.previousBands && musician.previousBands.length > 0) {
          musician.previousBands.forEach((bandInfo) => {
            if (bandInfo.band && bandInfo.band.name) {
              console.log(`  - Band: ${bandInfo.band.name}`);
              console.log(`    Left Year: ${bandInfo.leaveYear}`);
            }
          });
        } else {
          console.log('  No previous bands.');
        }
        console.log('------------------------------------');
      });
    } else {
      console.log('No musicians found.');
    }
  }
  viewBands() {
    console.log('** All Bands **');
    if (this.bands && this.bands.length > 0) {
      this.bands.forEach((band) => {
        console.log(`Name: ${band.name}`);
        console.log(`Info: ${band.infoText}`);
        console.log(`Formation Year: ${band.formationYear}`);
        if (band.disbandYear !== null) {
          console.log(`Disband Year: ${band.disbandYear}`);
        } else {
          console.log('Status: Still active');
        }
        console.log('Current Members:');
        if (band.currentMembers && band.currentMembers.length > 0) {
          band.currentMembers.forEach((memberInfo) => {
            if (memberInfo.member) {
              console.log(`  - Musician: ${memberInfo.member.name}`);
              console.log(`    Joined Year: ${memberInfo.joinYear}`);
              if (memberInfo.instruments) {
                console.log(`    Instruments Played: ${memberInfo.instruments.join(', ')}`);
              } else {
                console.log('    No instruments information available.');
              }
            }
          });
        } else {
          console.log('  No current members.');
        }
        console.log('Previous Members:');
        if (band.previousMembers && band.previousMembers.length > 0) {
          band.previousMembers.forEach((memberInfo) => {
            if (memberInfo.member) {
              console.log(`  - Musician: ${memberInfo.member.name}`);
              console.log(`    Left Year: ${memberInfo.leaveYear}`);
            }
          });
        } else {
          console.log('  No previous members.');
        }
        console.log('------------------------------------');
      });
    } else {
      console.log('No bands found.');
    }
  }


  saveDataToJson() {
    const jsonData = {
      musicians: this.musicians.map((musician) => {
        return {
          name: musician.name,
          infoText: musician.infoText,
          birthYear: musician.birthYear,
          instruments: musician.instruments,
          bands: musician.bands.map((b) => ({
            name: (b.band ? b.band.name : null), // Check if 'b.band' exists before accessing its properties
            joinYear: b.joinYear,
            instruments: b.instruments,
          })),
        };
      }),
      bands: this.bands.map((band) => band.toJSON()),
    };

    const jsonDataString = JSON.stringify(jsonData, null, 2);

    try {
      fs.writeFileSync('data.json', jsonDataString);
      console.log('Data saved to data.json');
    } catch (error) {
      console.error('An error occurred while saving data:', error);
    }
  }

  toJSON() {
    return {
      musicians: this.musicians,
      bands: this.bands,
    };
  }

  loadMusicians(musicians) {
    this.musicians = musicians.map((musicianData) => {
      const musician = new Musician(
        musicianData.name,
        musicianData.infoText,
        musicianData.birthYear,
        musicianData.instruments
      );
      musician.bands = musicianData.bands;
      musician.previousBands = musicianData.previousBands;
      return musician;
    });
  }

  loadBands(bands) {
    this.bands = bands.map((bandData) => {
      const band = new Band(
        bandData.name,
        bandData.infoText,
        bandData.formationYear,
        bandData.disbandYear
      );
      band.currentMembers = bandData.currentMembers;
      band.previousMembers = bandData.previousMembers;
      return band;
    });
  }

  loadDataFromJson() {
    try {
      const data = fs.readFileSync('data.json', 'utf8');
      const parsedData = JSON.parse(data);
      this.loadMusicians(parsedData.musicians);
      this.loadBands(parsedData.bands);
    } catch (error) {
      console.log('Data file not found or cannot be read.');
    }
  }
}

module.exports = Program;
