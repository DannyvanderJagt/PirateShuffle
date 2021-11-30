import styled from 'styled-components'
import { Cup, CUP_WIDTH, CUP_HEIGHT } from './Cup'
import { useAppState, actions } from '../state'
import { useEffect, useState } from 'react'

export const Game = () => {
  const appState = useAppState()

  useEffect(() => {
    actions.setupNextLevel()
  }, [])

  return (
    <Container>
      <Content>
        <Field
          style={{
            width: appState.game.amount * CUP_WIDTH,
            height: appState.game.rows * (CUP_HEIGHT * 0.8)
            }}>
            {appState.game.cups.map((cup, index) => (
              <Cup
                key={index}
                {...cup}
                hasCoin={cup.position === appState.game.coinIndex}
                showCoin={appState.game.showCoin}
                onClick={actions.submitResult}/>
            ))}
        </Field>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`