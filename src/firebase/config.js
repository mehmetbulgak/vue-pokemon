import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA_gflIF590CHoONECWOx5owcOUhj0Cx_o",
    authDomain: "pokemon-case-study.firebaseapp.com",
    projectId: "pokemon-case-study",
    storageBucket: "pokemon-case-study.appspot.com",
    messagingSenderId: "260942988543",
    appId: "1:260942988543:web:0c0d98b1bd209731b838ca"
};

initializeApp(firebaseConfig)

const auth = getAuth()

export { auth }