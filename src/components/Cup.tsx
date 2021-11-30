import styled from 'styled-components'
import { useAppState } from '../state'
import { Animate } from './Animate'

export const CUP_HEIGHT = 150
export const CUP_WIDTH = 140

export interface ICup {
  position: number,
  x: number,
  y: number,
  scale: number,
  zIndex: number,
  hasCoin?: boolean,
  showCoin?: boolean,

  onClick?: (position: number) => void
}

export const Cup = (props: ICup) => {
  const appState = useAppState()
  const onClick = () => props.onClick && props.onClick(props.position)

  return (
    <Animate
      x={props.x}
      y={props.y}
      scale={props.scale}
      zIndex={props.zIndex}
      duration={appState.game.shuffleTime}>
      <Container onClick={onClick}>
        <CupImg src='/assets/cup.svg' style={{
          transform: `translate(0, ${props.hasCoin && props.showCoin ? -100 : 0}px)`
        }}/>
        {props.hasCoin && <CoinImg src='/assets/coin.svg'/>}
        <ShadowImg src='/assets/shadow.svg'/>
      </Container>
    </Animate>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  margin: 0 20px;
`

const CupImg = styled.img`
  z-index: 2;
  transition: transform ease-out .6s;
`
const CoinImg = styled.img`
  position: absolute;
  bottom: 28px;
  width: 80px;
`
const ShadowImg = styled.img``