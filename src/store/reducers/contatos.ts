import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Contato from '../../models/Contato'
import * as enums from '../../utils/enums/Contatos'

type ContatoState = {
  itens: Contato[]
}

const initialState: ContatoState = {
  itens: [
    {
      id: 1,
      nome: 'Luiz Henrique A Cardoso',
      descricao: {
        email: 'luiz@hotmail.com',
        tel: 99999999999
      },
      prioridade: enums.Prioridade.PARTICULAR,
      status: enums.Status.PENDENTE
    },
    {
      id: 2,
      nome: 'Ana Nishihata',
      descricao: {
        email: 'Nishihata@hotmail.com',
        tel: 12123456789
      },
      prioridade: enums.Prioridade.PARTICULAR,
      status: enums.Status.VISUALIZADO
    },
    {
      id: 3,
      nome: 'EBAC Cursos',
      descricao: {
        email: 'EBAC_online@hotmail.com',
        tel: 12131415161
      },
      prioridade: enums.Prioridade.EMPRESA,
      status: enums.Status.PENDENTE
    }
  ]
}

const contatosSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter(
        (contato) => contato.id !== action.payload
      )
    },
    editar: (state, action: PayloadAction<Contato>) => {
      const indexDaTarefa = state.itens.findIndex(
        (c) => c.id === action.payload.id
      )

      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Contato, 'id'>>) => {
      console.log(action.payload)
      const contatoJaExiste = state.itens.find(
        (contato) =>
          contato.nome.toLowerCase() === action.payload.nome.toLocaleLowerCase()
      )

      if (contatoJaExiste) {
        alert('Já existe uma tarefa com esse nome')
      } else {
        const ultimoContato = state.itens[state.itens.length - 1]

        const contatoNovo = {
          ...action.payload,
          id: ultimoContato ? ultimoContato.id + 1 : 1
        }
        state.itens.push(contatoNovo)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexDaTarefa = state.itens.findIndex(
        (c) => c.id === action.payload.id
      )

      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa].status = action.payload.finalizado
          ? enums.Status.VISUALIZADO
          : enums.Status.PENDENTE
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } =
  contatosSlice.actions

export default contatosSlice.reducer
