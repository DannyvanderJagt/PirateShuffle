import { appState } from ".."
import { clock } from "./clock"

export const showCoin = async() => {
  appState.game.showCoin = true
  await clock(1000)
}

export const hideCoin = async() => {
  appState.game.showCoin = false
  await clock(1000)
}