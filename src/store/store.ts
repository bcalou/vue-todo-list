import todos from '@/store/modules/todos.ts';
import localStoragePlugin from '@/store/plugins/localStorage.ts';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todos,
  },
  plugins: [localStoragePlugin],
});
