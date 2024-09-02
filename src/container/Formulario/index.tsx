import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  ButtonSave,
  MainContainer,
  StyledInputMask,
  Titulo
} from '../../styles'
import { Campo } from '../../styles'
import { Form, Opcoes, Opcao } from './styles'
import * as enums from '../../utils/enums/Contatos'
import { cadastrar } from '../../store/reducers/contatos'
import Contato from '../../models/Contato'

const Formulario = () => {
  const dispatch = useDispatch()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.PARTICULAR)

  const cadastrarContato = (evento: FormEvent) => {
    const rawTel = '(00) 00000-0000'
    const tel = parseInt(rawTel.replace(/\D/g, ''), 10)

    evento.preventDefault()
    const contatoParaAdicionar = new Contato(
      nome,
      prioridade,
      enums.Status.PENDENTE,
      {
        email,
        tel
      },
      9
    )

    dispatch(cadastrar(contatoParaAdicionar))
  }

  return (
    <MainContainer>
      <Titulo>Nova tarefa</Titulo>
      <Form onSubmit={cadastrarContato}>
        <Campo
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          type="text"
          placeholder="Nome"
        />
        <Campo
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          placeholder="E-mail"
        />
        <Campo>
          <StyledInputMask
            mask="(99) 99999-9999"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </Campo>
        <Opcoes>
          <p>Prioridade</p>
          {Object.values(enums.Prioridade).map((prioridade) => (
            <Opcao key={prioridade}>
              <input
                value={prioridade}
                name="prioridade"
                type="radio"
                onChange={(evento) =>
                  setPrioridade(evento.target.value as enums.Prioridade)
                }
                id={prioridade}
                defaultChecked={prioridade === enums.Prioridade.PARTICULAR}
              />{' '}
              <label htmlFor={prioridade}>{prioridade}</label>
            </Opcao>
          ))}
        </Opcoes>
        <ButtonSave type="submit">Cadastrar</ButtonSave>
      </Form>
    </MainContainer>
  )
}

export default Formulario
