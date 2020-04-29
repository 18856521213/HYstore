import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"
//实行store的分类管理，方便以后更好的管理
const state = {

}
Vue.use(Vuex)

const store = new Vuex.Store({
    
    state,
    mutations,
    getters,
    actions
})
export default store