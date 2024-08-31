import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'

import { remover, editar } from '../../store/reducers/contatos'
import ContatoClass from '../../models/Contato'

type Props = ContatoClass

const Contato = ({
  descricao: descricaoOriginal,
  prioridade,
  status,
  nome,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [telefone, setTelefone] = useState(descricaoOriginal.tel.toString())
  const [email, setEmail] = useState(descricaoOriginal.email)

  useEffect(() => {
    if (email.length > 0) {
      setEmail(email)
    }
  }, [email])

  function cancelaEdicao() {
    setEstaEditando(false)
    setEmail(descricaoOriginal.email)
    setTelefone(descricaoOriginal.tel.toString())
  }

  function salvarEdicao() {
    const novaDescricao = {
      ...descricaoOriginal,
      email: email,
      tel: parseInt(telefone.replace(/\D/g, ''), 10)
    }

    dispatch(
      editar({
        descricao: novaDescricao,
        id,
        prioridade,
        status,
        nome
      })
    )

    setEstaEditando(false)
  }

  return (
    <S.CaixaDeContato>
      <S.Nome>{nome}</S.Nome>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Descricao>
        {estaEditando ? (
          <S.StyledInputMask
            mask=""
            maskChar=""
            type="email"
            readOnly={!estaEditando}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          email
        )}
      </S.Descricao>
      <S.Descricao>
        <S.StyledInputMask
          mask="(99) 99999-9999"
          value={telefone}
          readOnly={!estaEditando}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </S.Descricao>
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <S.ButtonSave onClick={salvarEdicao}>Salvar</S.ButtonSave>
            <S.ButtonCancelRemove onClick={cancelaEdicao}>
              Cancelar
            </S.ButtonCancelRemove>
          </>
        ) : (
          <>
            <S.Button onClick={() => setEstaEditando(true)}>Editar</S.Button>
            <S.ButtonCancelRemove onClick={() => dispatch(remover(id))}>
              Remover
            </S.ButtonCancelRemove>
          </>
        )}
      </S.BarraAcoes>
    </S.CaixaDeContato>
  )
}

export default Contato
