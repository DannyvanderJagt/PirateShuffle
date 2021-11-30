import styled from 'styled-components'

const presets = {
  coin: {
    title: (amount: number) => amount === 1 ? '1 coin' : `${amount } coins`,
    src: '/assets/coin.svg',
    colorPreset: 'yellow'
  },
  life: {
    title: (amount: number) => amount === 1 ? '1 life' : `${amount} lives`,
    src: '/assets/heart.svg',
    colorPreset: 'red'
  }
}

interface IScore {
  preset: "life" | "coin",
  amount: number
}

export const Score = (props:IScore) => {
  const preset = presets[props.preset]

  return (
    <Container colorPreset={preset.colorPreset}>
      <Icon src={preset.src}/>
      {preset.title(props.amount)}
    </Container>
  )
}

const Container = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 20px;
  height: 40px;
  padding-right: 20px;
  margin: 20px;

  font-size: 25px;
  font-weight: bold;

  border: 2px solid ${props => props.theme.presets[props.colorPreset].border};
  background: ${props => props.theme.presets[props.colorPreset].fill};
  color: ${props => props.theme.presets[props.colorPreset].border};
`

const Icon = styled.img`
  height: 50px;
  margin-left: -20px;
  margin-right: 10px;
`