import { createStore } from 'vuex'

import { auth } from '../firebase/config'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

const store = createStore({
    getters: {
        currentUser(state) {
            return state.user;
        }
    },
    state: {
        user: null,
        authIsReady: false
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
            if (payload) {
                localStorage.setItem('user', JSON.stringify(payload)); 
            } else {
                localStorage.removeItem('user');
            }
        },
        setAuthIsReady(state, payload) {
            state.authIsReady = payload
        }
    },
    actions: {
        async signup(context, { email, password }) {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            if (res) {
                context.commit('setUser', res.user)
            } else {
                throw new Error('could not complete signup')
            }
        },
        async login(context, { email, password }) {
            const res = await signInWithEmailAndPassword(auth, email, password);
            if (res) {
                context.commit('setUser', res.user);
            } else {
                throw new Error('could not complete login');
            }
        },
        async logout(context) {
            await signOut(auth)
            context.commit('setUser', null)
        }
    }
})

const unsub = onAuthStateChanged(auth, (user) => {
    store.commit('setAuthIsReady', true)
    store.commit('setUser', user)
    unsub()
})

export default store