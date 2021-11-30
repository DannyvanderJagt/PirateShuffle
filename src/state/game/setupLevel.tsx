import { appState, IGameConfig } from '../index'
import { CUP_HEIGHT, CUP_WIDTH, ICup } from '../../components/Cup'
import { clock } from './clock'

export const setupLevel = async (level:number) => {
  appState.level = level
  const gameConfig = setupLevelConfig(level, appState.game)
  const cups = generateCups(gameConfig)

  // Adjust global state
  appState.game = gameConfig
  appState.game.cups = cups

  await clock(appState.game.shuffleTime)
}

const setupLevelConfig = (level:number, gameConfig: IGameConfig):IGameConfig => {
  const totalCups = 1 + level
  let rows = 1

  if(level >= 5){ rows = 2 }
  if(level >= 10){ rows = 3 }

  gameConfig.amount = Math.floor(totalCups/rows)
  gameConfig.rows = rows
  gameConfig.shuffles = 2 + level
  gameConfig.shuffleTime = 1000 * (1 - level * 0.05)

  return gameConfig
}

const generateCups = (gameConfig: IGameConfig):ICup[] => {
  let cups:ICup[] = []

  for(let i = 0; i < gameConfig.rows; i++){
    const rowAmount = gameConfig.amount - i
    const rowIndex = i
    const overalIndex = cups.length

    cups = cups.concat(
      new Array(rowAmount)
        .fill('')
        .map((_i, index) => ({
          position: overalIndex + index,
          x: index * CUP_WIDTH + (rowIndex * (CUP_WIDTH/2)),
          y: rowIndex * (CUP_HEIGHT * 0.6),
          scale: 1,
          zIndex: rowIndex,
        }))
    )
  }

  return cups
}