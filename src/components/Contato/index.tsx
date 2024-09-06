import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'
import * as enums from '../../utils//enums/Contatos'

import { remover, editar, alteraStatus } from '../../store/reducers/contatos'
import ContatoClass from '../../models/Contato'
import { Button, ButtonSave, StyledInputMask } from '../../styles'
import { StyledInputNome } from './styles'

type Props = ContatoClass

const Contato = ({
  descricao: descricaoOriginal,
  prioridade,
  status,
  nome: nomeOriginal,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [tel, setTel] = useState(descricaoOriginal.tel.toString())
  const [email, setEmail] = useState(descricaoOriginal.email)
  const [nome, setNome] = useState(nomeOriginal)

  useEffect(() => {
    if (email.length > 0) {
      setEmail(email)
    }
  }, [email])

  function cancelaEdicao() {
    setEstaEditando(false)
    setEmail(descricaoOriginal.email)
    setTel(descricaoOriginal.tel.toString())
    setNome(nomeOriginal)
  }

  function salvarEdicao() {
    const novaDescricao = {
      ...descricaoOriginal,
      email: email,
      tel: parseInt(tel.replace(/\D/g, ''), 10)
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

  function alteraStatusContato(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(
      alteraStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }

  return (
    <S.CaixaDeContato>
      <label htmlFor={nome}>
        <input
          type="checkbox"
          checked={status === enums.Status.VISUALIZADO}
          id={nome}
          onChange={alteraStatusContato}
        />
        <S.Nome>
          {estaEditando ? (
            <>
              <em>Editando: </em>
              <StyledInputNome
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </>
          ) : (
            nome
          )}
        </S.Nome>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Descricao>
        {estaEditando ? (
          <StyledInputMask
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
        <StyledInputMask
          mask="(99) 99999-9999"
          value={tel}
          readOnly={!estaEditando}
          onChange={(e) => setTel(e.target.value)}
        />
      </S.Descricao>
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <ButtonSave onClick={salvarEdicao}>Salvar</ButtonSave>
            <S.ButtonCancelRemove onClick={cancelaEdicao}>
              Cancelar
            </S.ButtonCancelRemove>
          </>
        ) : (
          <>
            <Button onClick={() => setEstaEditando(true)}>Editar</Button>
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
