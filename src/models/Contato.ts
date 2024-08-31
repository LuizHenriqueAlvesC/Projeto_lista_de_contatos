import * as enums from '../utils/enums/Contatos'

class Contato {
  nome: string
  prioridade: enums.Prioridade
  status: enums.Status
  descricao!: {
    email: string
    tel: number
  }
  id: number

  constructor(
    nome: string,
    prioridade: enums.Prioridade,
    status: enums.Status,
    descricao: {
      email: string
      tel: number
    },
    id: number
  ) {
    this.nome = nome
    this.prioridade = prioridade
    this.status = status
    this.descricao = descricao
    this.id = id
  }
}

export default Contato
