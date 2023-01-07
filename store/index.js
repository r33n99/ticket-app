import axios from 'axios'

export const state = () => ({
  isAuth: false,
  priceHour: null,
  priceMin: null,
  loading: false,
  user: null,
  totalPrice: 0,
  uuid: '',
  startTime: '',
  authError: '',
  seconds:0,
  minutes:0,
  hours:0,
  totalValue:''
})

export const actions = {
  async login({ commit }, user) {
    const { username, password } = user
    try {
      commit('loadingChange', true)
      const { data } = await axios.post('https://adonis-api-reen.herokuapp.com/api/login', {
        username,
        password,
      })
      commit('authUser', data)
      localStorage.setItem('token', data.auth.token)
      if (data.user[0].session) {
        commit('setUuid', data.user[0].session)
      }
      console.log(data)
      commit('loadingChange', false)
      this.$router.push('/')
      return data
    } catch (error) {
      commit('setError', error.message)
      commit('loadingChange', false)
    }
  },

  async register({ commit }, user) {
    const { role, username, password } = user
    try {
      commit('loadingChange', true)
      const { data } = await axios.post('https://adonis-api-reen.herokuapp.com/api/register', {
        role,
        username,
        password,
      })
      commit('loadingChange', false)
      return data
    } catch (error) {
      commit('setError', error.message)
      commit('loadingChange', false)
    }
  },

  async updateHourPrice({ commit }, price) {
    try {
      commit('loadingChange', true)
      const { data } = await axios.patch(
        'https://adonis-api-reen.herokuapp.com/api/update-hour',
        { price_hour: price },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-type': 'multipart/form-data',
          },
        }
      )
      commit('loadingChange', false)
      return data
    } catch (error) {
      commit('setError', error.message)
      commit('loadingChange', false)
    }
  },

  async updateMinPrice({ commit }, price) {
    try {
      commit('loadingChange', true)
      const { data } = await axios.patch(
        'https://adonis-api-reen.herokuapp.com/api/update-min',
        { price_min: price },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-type': 'multipart/form-data',
          },
        }
      )
      console.log(localStorage.getItem('token'))
      commit('loadingChange', false)
      return data
    } catch (error) {
      commit('setError', error.message)
      commit('loadingChange', false)
    }
  },

  async getPrice({ commit }) {
    try {
      const { data } = await axios.get('https://adonis-api-reen.herokuapp.com/api/get-price', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      commit('getPrices', data[0])
      return data
    } catch (error) {
      console.log(error)
    }
  },

  async createSession({ commit }) {
    try {
      commit('loadingChange', true)
      const { data } = await axios.post(
        'https://adonis-api-reen.herokuapp.com/api/create-session'
      )
      console.log(data)
      commit('setUuid', data.uuid)
      commit('loadingChange', false)
      return data
    } catch (error) {
      commit('setError', error.message)
      commit('loadingChange', false)
    }
  },

  async getSession({ commit }) {
    try {
      commit('loadingChange', true)
      const session = localStorage.getItem('uuid')
      const { data } = await axios.get(
        `https://adonis-api-reen.herokuapp.com/api/get-session/${session}`
      )
      console.log(data)
      commit('setStartTime', data.created_at)
      commit('loadingChange', false)
      return data
    } catch (error) {
      commit('setError', error.message)
      commit('loadingChange', false)
    }
  },
  async updateUser({ state, commit }) {
    try {
      commit('loadingChange', true)
      const sessionUuid = localStorage.getItem('uuid')
      const { data } = await axios.patch(
        `https://adonis-api-reen.herokuapp.com/api/update/${state.user.id}`,
        { uuid: sessionUuid },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'content-type': 'application/json; charset=utf-8',
          },
        }
      )
      commit('setUser', data)
      commit('loadingChange', false)
      return data
    } catch (error) {
      commit('setError', error.message)
      commit('loadingChange', false)
    }
  },
}

export const mutations = {
  getPrices(state, price) {
    const { price_hour, price_min } = price
    state.priceHour = price_hour
    state.priceMin = price_min
  },
  setError(state, error) {
    console.log(error)
    state.authError = error
  },
  sessionToLocalStorage(state, uuid) {
    state.uuid = uuid
  },
  userToLocalStorage(state, user) {
    const userData = JSON.parse(user)
    if (userData) {
      state.user = userData
      state.isAuth = true
      this.$router.push('/')
    }
  },
  loadingChange(state, loading) {
    state.loading = loading
  },

  logout(state) {
    state.isAuth = false
    state.user = null
    localStorage.clear()
  },
  setUser(state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  authUser(state, user) {
    if (user?.status === 'loggin') {
      state.user = user.user[0]
      state.isAuth = true
      localStorage.setItem('user', JSON.stringify(user.user[0]))
    }
  },
  changePrice(state, obj) {
    if (obj.type === 'hour') {
      state.priceHour = obj.price
    } else if (obj.type === 'min') {
      state.priceMin = obj.price
    }
  },
  setTotalPrice(state, { hour, min }) {
    if (hour < 1) {
      state.totalPrice = min * state.priceMin
    } else {
      state.totalPrice = (hour * state.priceHour).toFixed()
    }
  },
  setUuid(state, time) {
    state.uuid = time
    localStorage.setItem('uuid', time)
  },
  nuller(state) {
    state.totalPrice = 0
    state.uuid = ''
    state.startTime = ''
  },
  setStartTime(state, time) {
    state.startTime = time
    localStorage.setItem('time',time)
  },
  setOverTime(state,time){
    state.seconds = time.seconds
    state.minutes = time.minutes
    state.hours = time.hours
  },
  setTotalValue(state,value){
    state.totalValue = value
  }
}
