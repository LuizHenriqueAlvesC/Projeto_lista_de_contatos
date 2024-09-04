import styled, { createGlobalStyle } from 'styled-components'
import InputMask from 'react-input-mask'
import variaveis from './variaveis'

const EstiloGlobal = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  list-style: none;
}
`
export const Container = styled.div`
  display: grid;
  grid-template-columns: 224px auto;
  background-color: #eee;
`

export const MainContainer = styled.main`
  height: 100vh;
  overflow-y: scroll;
  padding: 0 40px;
`

export const Titulo = styled.h2`
  display: block;
  font-weight: bold;
  font-size: ;
  margin-top: 40px;
  margin-bottom: 40px;
`

export const Campo = styled.input`
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;
  font-weight: bold;
  color: #666666;
  border-color: #666666;
  width: 100%;
`

export const StyledInputMask = styled(InputMask)`
  border: none;
  background-color: transparent;
  color: inherit;
  font: inherit;
  outline: none;
  padding: 0;
`

export const CampoComMascara = styled(InputMask)`
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;
  font-weight: bold;
  color: #666666;
  border-color: #666666;
  width: 100%;
`

export const Button = styled.button`
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  background-color: ${variaveis.azulEscuro};
  border-radius: 8px;
  margin-right: 8px;
`

export const ButtonSave = styled(Button)`
  background-color: ${variaveis.verde};
`
export default EstiloGlobal
