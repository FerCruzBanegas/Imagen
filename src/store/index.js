import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import auth from './auth'
import settings from './settings'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  	auth,
    user,
    settings
  },
  plugins: [createPersistedState()]
})
