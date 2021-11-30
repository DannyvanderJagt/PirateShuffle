import { proxy, useSnapshot } from 'valtio'
import { ICup } from '../components/Cup'
import { clock } from './game/clock'
import { hideCoin, showCoin } from './game/coin'
import { setupLevel } from './game/setupLevel'
import { shuffle } from './game/shuffle'

type TgameStatus = "init" | "ready" | "shuffle" | "waitForUserInput" | "completed" | "error" | "success" | "gameover" | "win"

export interface IGameConfig {
  status: TgameStatus,

  showCoin: boolean,
  coinIndex: number,

  amount: number,
  rows: number,

  shuffles: number,
  shuffleTime: number,

  cups: ICup[]
}

interface IAppState {
  showIntro: boolean,
  showGame: boolean,

  lives: number,
  coins: number,

  level: number,
  maxLevel: number,

  game: IGameConfig
}

export const appState = proxy<IAppState>({
  showIntro: true,
  showGame: false,

  lives: 2,
  coins: 0,

  level: 0,
  maxLevel: 15,

  game: {
    status: "init",
    showCoin: true,
    coinIndex: 0,
    amount: 3,
    rows: 1,
    shuffles: 4,
    shuffleTime: 1000,
    cups: [],
  }
})

export const useAppState = () => {
  const snap = useSnapshot(appState)
  return snap
}

export const actions = {
  hideIntro: () => {
    appState.showIntro = false
    appState.showGame = true
  },

  setupNextLevel: async() => {
    await hideCoin()
    await setupLevel(appState.level + 1)
    await showCoin()
    appState.game.status = "ready"
  },
  startLevel: async() => {
    appState.game.status = 'shuffle'
    await shuffle()
    appState.game.status = "waitForUserInput"
  },
  submitResult: async(cupIndex: number) => {
    if(appState.game.status !== "waitForUserInput"){ return }
    appState.game.status = "completed"
    await showCoin()

    const success = appState.game.coinIndex === cupIndex
    appState.game.status = success ? "success" : "error"

    if(success){ appState.coins++ }
    if(!success){ appState.lives-- }

    if(appState.lives <= 0){
      appState.game.status = "gameover"
      return
    }

    if(appState.level === 15 && success){
      appState.game.status = "win"
      return
    }

    if(success){
      await actions.setupNextLevel()
      return
    }

    await clock(1000)
    appState.game.status = "ready"
  },

  restart: () => {
    appState.level = 0
    appState.lives = 2
    appState.coins = 0
    appState.game.status = "init"
    actions.setupNextLevel()
  }
}