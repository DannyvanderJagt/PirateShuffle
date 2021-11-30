import styled from 'styled-components'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { Score } from './Score'
import { Game } from './Game'
import { useAppState, actions } from '../state'
import { Button } from './Button'
import { EndScreen } from './EndScreen'

export const GameScene = () => {
  const appState = useAppState()

  const winOrLose = appState.game.status === 'win' || appState.game.status === 'gameover'

  return (
    <Container>
      <Icon src='/assets/icon.svg'/>
      <ScoreContainer>
        <Score
          preset='coin'
          amount={appState.coins}/>
        <Score
          preset='life'
          amount={appState.lives}/>
      </ScoreContainer>

      <Level>{appState.level}/{appState.maxLevel}</Level>

      {!winOrLose && <Game/>}
      {winOrLose && <EndScreen win={appState.game.status === 'win'}/>}

      <ButtonContainer>
        {appState.game.status === "ready" && <Button title='start' onClick={actions.startLevel}/>}
      </ButtonContainer>
      <BottomBar>
        {appState.game.status === 'error' && <SelectText>Oh, that wrong! Let's try that again.</SelectText>}
        {appState.game.status === 'success' && <SelectText>Success! You did it!</SelectText>}
        {appState.game.status === "init" && <SelectText>Setting up the cups for you.</SelectText>}
        {appState.game.status === "ready" && <SelectText>We're ready when you are!</SelectText>}
        {appState.game.status === "shuffle" && <SelectText>Shuffle, shuffle, shuffle...</SelectText>}
        {appState.game.status === "waitForUserInput" && <SelectText>Show me! Where is the coin?</SelectText>}
        <Pirate src='/assets/pirate.svg'/>
      </BottomBar>

      <ReactCanvasConfetti
        fire={appState.game.status === 'success' || appState.game.status === "win"}
        particleCount={500}
        spread={180}
        style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -100,
      }}/>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`

const Level = styled.div`
  position: fixed;
  top: 40px;
  right: 40px;

  font-size: 30px;
  font-weight: bold;
  color: ${props => props.theme.primary};
`
const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 140px;
  background: ${props => props.theme.primary};
`

const Pirate = styled.img`
  position: fixed;
  right: 40px;
  bottom: -40px;
  width: 300px;
`
const ButtonContainer = styled.div`
  height: 150px;
`

const SelectText = styled.span`
  font-size: 34px;
  font-weight: bold;
  color: ${props => props.theme.primaryShade};
`
const Icon = styled.img`
  position: fixed;
  top: 40px;
  left: 40px;
`