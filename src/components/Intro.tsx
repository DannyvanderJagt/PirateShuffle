import styled from 'styled-components'
import { Button } from './Button'

interface IIntro {
  onClick: () => void
}

export const Intro = (props:IIntro) => (
  <Container>
    <Content>
      <Title src='/assets/title.svg'/>
      <InfoContainer>
        <Info>
          <Bubble style={{ marginLeft: 20, marginTop: -40 }}><b>Arr!</b>I’m Jack the pirate!</Bubble>
          <Bubble style={{ marginLeft: -40 }}><b>I lost all my coins.</b></Bubble>
          <Bubble style={{marginBottom: 40, marginLeft: 40}}>
            <Coin src='/assets/coin.svg'/>
            <Coin src='/assets/coin.svg'/>
            <Coin src='/assets/coin.svg'/>
            <b>???</b>
          </Bubble>
          <Button title='I will help you' onClick={props.onClick}/>
        </Info>
        <Pirate src='/assets/pirate.svg'/>
      </InfoContainer>
    </Content>
  </Container>
)


const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.img`
  height: 300px;
`

const Pirate = styled.img`
  width: 300px;
`
const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Bubble = styled.div`
  display: flex;
  flex-direction: row;
  background: ${props => props.theme.grayTint};
  border: 1px solid ${props => props.theme.gray};
  border-radius: 50px;
  font-size: 26px;
  padding: 10px 20px;
  margin: 10px;
`
const Coin = styled.img`
  width: 40px;
`

