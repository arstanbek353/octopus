export const state = () => ({
  items: [],
  busket: [],
  queryParams: {
    is_favourite: null,
    type: null,
    q: null,
    ids: null,
    _limit: 10
  }
})

export const getters = {
  getItems(state) {
    return state.items
  },
  getBusket(state) {
    if (!(state.busket.length && state.busket.length)) {
      return [];
    }
    if (state.busket.length !== state.busket.length) {
      return [];
    }
    return state.items.map(item => {
      const b = state.busket.find(i => i.item_id === item.id)
      return {
        ...item,
        is_paid: b && b.is_paid
      }
    })
  },
  getBusketIds(state) {
    return state.busket.map(item => {
      return item.item_id
    })
  }
}

export const mutations = {
  setItems(state, data) {
    state.items = data
  },
  setBusket(state, data) {
    state.busket = data
  },
  setqueryParams(state, data) {
    state.queryParams = {...state.queryParams, ...data}
  },
  updateItemById(state, data) {
    const index = state.items.findIndex(i => i.id === data.id)
    state.items[index] = data
    const items = [...state.items]
    state.items = items
  },
  updateBusketById(state, id) {
    const index = state.busket.findIndex(i => i.id === id)
    state.busket[index] = {...state.busket[index], is_paid: true}
    const busket = [...state.busket]
    state.busket = busket
  },
  resetQueryParams(state) {
    state.queryParams = {
      is_favourite: null,
      type: null,
      q: null,
      ids: null,
      _limit: 10
    }
  },
}

export const actions = {
  async fetchToggleFavourite({commit}, data) {
    const res = await this.$axios.$put('/items/' + data.id, data)
    commit('updateItemById', res)
    return res;
  },
  async fetchToBusket({commit}, data) {
    const busket = await this.$axios.$get('/busket')
    const find = busket.find(i => i.item_id === data.item_id)
    if (find) {
      return {message: 'Не удалось добавить'}
    }
    const res = await this.$axios.$post('/busket/', data)
    return {...res, message: 'Успешно добавлено'};
  },
  async fetchToPay({commit}, id) {
    const busket = await this.$axios.$get('/busket')
    const find = busket.find(i => i.item_id === id)
    const res = await this.$axios.$put('/busket/' + find.id, 
      { 
        ...find,
        is_paid: true
      }
    )
    commit('updateBusketById', id)
    return res;
  },
  async fetchItems({state, commit}) {
    const params = state.queryParams
    const res = await this.$axios.$get('/items',
      {
        params: {
          is_favourite: params.is_favourite,
          type: params.type,
          q: params.q,
          id: params.ids,
          _limit: params._limit
        }
      }
    )
    commit('setItems', res)
    return res;
  },
  async fetchBusket({commit}) {
    const res = await this.$axios.$get('/busket')
    commit('setBusket', res)
    return res;
  }
}