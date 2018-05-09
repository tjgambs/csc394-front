
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isViewingAsStudent: Boolean(window.localStorage.getItem('studentToken')),
    updateUser: false,
  },
  getters: {
    getUpdateUser: state => () => state.updateUser
  },
  mutations: {
    exitStudentView (state) {
      state.isViewingAsStudent = false;
    },
    enterStudentView (state) {
      state.isViewingAsStudent = true;
    },
    updateUser(state) {
      state.updateUser = !state.updateUser;
    }
  }
})
