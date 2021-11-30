import styled from 'styled-components'
import { actions } from '../state'
import { Button } from './Button'

interface IEndScreen {
  win: boolean
}

export const EndScreen = (props:IEndScreen) => {

  return (
    <Container>
      {!!props.win && <Win src='/assets/win.svg'/>}
      {!props.win && <Lose src='/assets/gameover.svg'/>}
      <Button title='Play again' style={{ marginTop: 40} } onClick={actions.restart}/>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Win = styled.img``
const Lose = styled.img``