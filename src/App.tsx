import { GameScene } from './components/GameScene'
import styled, { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from './styles'

import { Intro } from './components/Intro'
import { useAppState, actions } from './state'

function App() {
  const appState = useAppState()

  return (
    <>
      <GlobalStyle/>
      <ThemeProvider theme={theme}>
        <Container>
          {appState.showIntro && <Intro onClick={actions.hideIntro}/>}
          {appState.showGame && <GameScene/>}
        </Container>
      </ThemeProvider>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  border: 13px solid ${props => props.theme.primary};
`


export default App;
