import { useDispatch, useSelector } from 'react-redux'
import FiltroCard from '../../components/FiltroCard'

import { RootReducer } from '../../store'
import { alteraTermo } from '../../store/reducers/filtro'

import * as S from './styles'
import * as enums from '../../utils/enums/Contatos'

const BarraLateral = () => {
  const dispatch = useDispatch()
  const { termo } = useSelector((state: RootReducer) => state.filtro)
  return (
    <S.Aside>
      <div>
        <S.Campo
          type="text"
          placeholder="Buscar"
          value={termo}
          onChange={(evento) => dispatch(alteraTermo(evento.target.value))}
        />
        <S.Filtros>
          <FiltroCard
            valor={enums.Status.PENDENTE}
            criterio="status"
            legenda="Contatos Pendentes"
          />
          <FiltroCard
            valor={enums.Prioridade.PARTICULAR}
            criterio="prioridade"
            legenda="Contatos particulares"
          />
          <FiltroCard
            valor={enums.Prioridade.EMPRESA}
            criterio="prioridade"
            legenda="Contatos de empresas"
          />
          <FiltroCard
            valor={enums.Status.VISUALIZADO}
            criterio="status"
            legenda="Contatos visualizados"
          />
          <FiltroCard criterio="todas" legenda="todos contatos" />
        </S.Filtros>
      </div>
    </S.Aside>
  )
}

export default BarraLateral
