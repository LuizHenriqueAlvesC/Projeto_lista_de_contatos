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
    cadastrar: (state, action: PayloadAction<Contato>) => {
      const contatoJaExiste = state.itens.find(
        (contato) =>
          contato.nome.toLowerCase() === action.payload.nome.toLocaleLowerCase()
      )

      if (contatoJaExiste) {
        alert('Já existe uma tarefa com esse nome')
      } else {
        state.itens.push(action.payload)
      }
    }
  }
})

export const { remover, editar, cadastrar } = contatosSlice.actions

export default contatosSlice.reducer
