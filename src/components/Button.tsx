import styled from 'styled-components'

interface IButton {
  title: string,
  style?: React.CSSProperties,
  onClick: () => void
}

export const Button = (props:IButton) => (
  <Container onClick={props.onClick} style={props.style}>
    {props.title}
  </Container>
)

const Container = styled.div`
  position: relative;
  align-self: center;
  background: ${props => props.theme.primary};
  border-radius: 15px;
  height: 70px;

  font-size: 30px;
  font-weight: bold;
  color: ${props => props.theme.primaryShade};
  padding: 10px 40px;
  cursor: pointer;

  &:after, &:hover:after {
    position: absolute;
    content: '';
    background: ${props => props.theme.primaryShade};
    height: 40px;
    width: 100%;
    left: 0px;
    bottom: -10px;
    z-index: -1;
    border-radius: 15px;
  }

  &:hover:after {
    bottom: -5px;
  }
`