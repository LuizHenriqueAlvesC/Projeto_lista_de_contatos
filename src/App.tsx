import { Provider } from 'react-redux'
import BarraLateral from './container/BarraLateral'
import ListaDeContatos from './container/ListaDeContatos'
import EstiloGlobal, { Container } from './styles'

import store from './store'

function App() {
  return (
    <Provider store={store}>
      <EstiloGlobal />
      <Container>
        <BarraLateral />
        <ListaDeContatos />
      </Container>
    </Provider>
  )
}

export default App
