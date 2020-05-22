import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCKRsF_unXGu1EfrggMjpmh8L3DXSkVxG4",
    authDomain: "react-gio-commerce.firebaseapp.com",
    databaseURL: "https://react-gio-commerce.firebaseio.com",
    projectId: "react-gio-commerce",
    storageBucket: "react-gio-commerce.appspot.com",
    messagingSenderId: "263065638850",
    appId: "1:263065638850:web:2d17f7f4a9e168f492685b"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;