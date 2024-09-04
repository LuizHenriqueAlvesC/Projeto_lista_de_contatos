import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  ButtonSave,
  CampoComMascara,
  MainContainer,
  Titulo
} from '../../styles'
import { Campo } from '../../styles'
import { Form, Opcoes, Opcao } from './styles'
import * as enums from '../../utils/enums/Contatos'
import { cadastrar } from '../../store/reducers/contatos'

const Formulario = () => {
  const dispatch = useDispatch()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.PARTICULAR)

  const cadastrarContato = (evento: FormEvent) => {
    const telefoneLimpo = tel.replace(/\D/g, '')

    evento.preventDefault()

    dispatch(
      cadastrar({
        nome,
        prioridade,
        descricao: {
          email,
          tel: Number(telefoneLimpo)
        },
        status: enums.Status.PENDENTE
      })
    )
  }

  return (
    <MainContainer>
      <Form onSubmit={cadastrarContato}>
        <Titulo as="h1">Nova tarefa</Titulo>
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
        <CampoComMascara
          mask="(99) 99999-9999" // Máscara de telefone
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          placeholder="(00) 00000-0000"
        />
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
