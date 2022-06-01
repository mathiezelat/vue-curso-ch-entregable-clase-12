import axios from "axios"
const apiUrl = process.env.VUE_APP_API_URL_USERS

export default {
    namespaced: true,
    state: {
        users: []
    },
    getters: {
        getUsers: (state) => {
            return state.users
        }
    },
    mutations: {
        SET_USERS: (state, payload) => {
            state.users = payload
        },
        SET_USER: (state, payload) => {
            state.users.push(payload)
        }
    },
    actions: {
        setUsers: async (context) => {
            let result = null
            const { data } = await axios.get(apiUrl)
            result = data
            if(result !== null) {
                context.commit('SET_USERS', result)
            }
        },
        setUser: (context, payload) => {
            context.commit('SET_USER', payload)
        }
    }
}