const warriorsJson = require('../json/warriors.json')
const weapons = require('../json/weapons.json')

const initialMessage = () => {
  console.log('WELCOME TO THE TRAINING GROUNDS!!!')
  console.log('----------------------------------\n')
}

const asignWeapons = () => {
  const warriors = warriorsJson
  let equipedWarriors = []
  warriors.forEach(w => {
    const newWarrior = equip(w)
    equipedWarriors.push(newWarrior)
    if (newWarrior.weapon) {
      console.log(`${newWarrior.name} has selected the weapon "${newWarrior.weapon.name}"\n`)

    } else {
      console.log(`${newWarrior.name} has no weapon to wield!\n`)
    }
  });

  return equipedWarriors
}

const equip = (warrior) => {
  let unequipedWeapons = weapons
  let newWarrior = {
    ...warrior,
    weapon: null
  }
  unequipedWeapons.forEach((w, index) => {
    if (w.minStrength <= warrior.strength) {
      newWarrior = {
        ...warrior,
        weapon: w
      }
      unequipedWeapons.splice(index, 1)

    }
  })
  return newWarrior
}

const createRound = (roundData, warriors) => {
  roundData = {
    ...roundData,
    roundNum: roundData.roundNum++
  }

  let warrior = selectWarrior(warriors)
  
  warrior = {
    ...warrior,
    state: 'finished'
  }

  let trainingState = {
    epicDate: `${roundData.month} ${roundData.day}, ${roundData.hour}:00`,
    warrior: warrior
  }


  console.log(` === ROUND ${roundData.roundNum} - ${roundData.month} ${roundData.day}, ${roundData.hour}:00 hours ===`)
  if (warrior.weapon) {
    const cost = Math.floor(warrior.weapon.cost * 0.1)
    console.log(`Warrior: ${warrior.name}`)
    console.log(`Strength: ${warrior.strength}`)
    console.log(`Gold: ${warrior.gold}`)
    console.log(`Weapon: ${warrior.weapon.name}`)
    console.log(`Type: ${warrior.weapon.type}`)
    console.log(`Qulity: ${warrior.weapon.quality}`)
    console.log(`Durability: ${warrior.weapon.durability}`)
    console.log(`Cost of training: ${Math.floor(warrior.weapon.cost * 0.1)}`)
    const warriorBeforeTrain = warrior
    if (warrior.gold > cost) {
      if (warrior.weapon.durability > 0) {
        warrior = {
          ...warrior,
          state: 'Trainng'
        }
        train(warrior, warriorBeforeTrain)
        let hour = roundData.hour + 2
        let day = roundData.day
        let month = roundData.month

        if (hour > 24) {
          hour = 0
          day++
          if (day > 30) {
            day = 1
          }
        }

        roundData = {
          ...roundData,
          day: day,
          month: month,
          hour: hour
        }

        trainingState = {
          epicDate: `${roundData.month} ${roundData.day}, ${roundData.hour}:00`,
          warrior: warrior
        }

        return [trainingState]
      } else {
        console.log(`${warrior.name} has not enough durability on the weapon and cannot train.`)
      }
    } else {
      console.log(`${warrior.name} cannot train because they have no gold left.`)
    }
  } else console.log(`${warrior.name} has no weapon asigned and cannot train.`)


}

const selectWarrior = (warriors) => {
  const warrior = warriors[Math.floor(Math.random() * warriors.length)]
  return warrior
}

const train = (warrior, warriorBeforeTraining) => {
  const gold = calculateGold(warrior.gold, warrior.weapon.cost)
  const dice = Math.floor((Math.random() * 5) + 1) - 2
  const qualityValue = warrior.weapon.quality + dice
  const durability = Math.floor(calculateDurability(warrior.weapon.durability, dice))
  warrior = {
    ...warrior,
    gold: gold,
    weapon: {
      ...warrior.weapon,
      quality: qualityValue,
      durability: durability
    }
  }

  
  if(warrior.weapon.quality < 0) {
    warrior = {
      ...warrior,
      weapon: {
        ...weapon,
        durability: warrior.weapon.durability - 1
      }      
    }
  }

  console.log('After trainig: ')
  console.log(`Quality: ${warriorBeforeTraining.weapon.quality} -> ${warrior.weapon.quality}`)
  console.log(`Durability: ${warrior.weapon.durability}`)
  console.log('Gold remaining: ', warrior.gold)
}

const calculateDurability = (durability, qualityValue) => {
  switch (qualityValue) {
    case -1:
      return durability * 0.8;

    case 0:
      return durability - 1;

    case 1:
      return durability * 0.9;

    case 2:
      return durability * 0.8;

    case 3:
      const random = Math.floor(Math.random() * 100);

      if (random >= 50) return durability++;
      return durability * 0.7;
    default:
      return 1000
  }
}

const calculateGold = (gold, cost) => {
  return gold - Math.floor(cost * 0.1)
}


module.exports = {
  initialMessage,
  asignWeapons,
  createRound
}