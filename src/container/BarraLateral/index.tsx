import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import FiltroCard from '../../components/FiltroCard'

import { RootReducer } from '../../store'
import { alteraTermo } from '../../store/reducers/filtro'

import * as S from './styles'
import * as enums from '../../utils/enums/Contatos'
import { Button, Campo } from '../../styles'

type Props = {
  mostrarFiltros: boolean
}

const BarraLateral = ({ mostrarFiltros }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { termo } = useSelector((state: RootReducer) => state.filtro)
  return (
    <S.Aside>
      <div>
        {mostrarFiltros ? (
          <>
            <Campo
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
          </>
        ) : (
          <Button onClick={() => navigate('/')} type="button">
            Voltar a lista de Contatos
          </Button>
        )}
      </div>
    </S.Aside>
  )
}

export default BarraLateral
