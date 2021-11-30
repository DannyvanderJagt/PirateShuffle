import { appState } from ".."
import { clock } from "./clock"
import { hideCoin } from "./coin"

export const shuffle = async() => {
  await hideCoin()

  for(let i = 0; i < appState.game.shuffles; i++){
    await shuffleCups()
  }
}

const shuffleCups = async() => {
  const [r1, r2] = generateRandomNumbers(appState.game.cups.length)
  const cups = appState.game.cups

  const firstCup = {
    ...cups[r1],
    position: r2
  }
  const secondCup = {
    ...cups[r2],
    position: r1
  }

  cups[r1] = secondCup
  cups[r2] = firstCup

  await clock(appState.game.shuffleTime * 1.1)
}

const generateRandomNumbers = (max:number):[number, number] => {
  const r1 = Math.floor(Math.random() * max)
  const r2 = Math.floor(Math.random() * max)

  if(r1 === r2){ return generateRandomNumbers(max) }
  return [r1, r2]
}