import styled, { css } from 'styled-components'

export const Animate = (props: IContainer) => (
  <Container {...props}>
    {props.children}
  </Container>
)

interface IContainer {
  x: number,
  y: number,
  scale: number,
  zIndex: number,
  duration: number,
  children: React.ReactChild
}

const Container = styled.div<IContainer>`
  position: absolute;
  transition: all 1s ease-out;

  ${props => css`
    z-index: ${props.zIndex};
    transform: translate(${props.x * props.scale}px, ${props.y * props.scale}px) scale(${props.scale});
  `}
`