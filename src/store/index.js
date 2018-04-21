import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
      accountType: 'accountType'
    }
  },
  mutations: {
    setUser (state, user) {
      state.user.email = user.email;
      state.user.firstName = user.first_name;
      state.user.lastName = user.last_name;
      state.user.accountType = user.account_type;
    }
  }
})
