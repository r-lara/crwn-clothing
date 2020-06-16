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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    await userRef.get()
        .then( snapShot => {
            console.log('additional data', additionalData)
            if(!snapShot.exists){
                const { displayName, email, uid } = userAuth
                const createdAt = new Date();
                
                console.log('additional data if doesnt exist', additionalData)
                userRef.set({ displayName, email, uid, createdAt, ...additionalData })
            }
        })
        .catch( error => {
            console.log('error creating user', error.message)
        })

    return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const db = firebase.firestore()
    const collectionRef = db.collection(collectionKey)

    const batch = db.batch()
    objectsToAdd.forEach( obj => batch.set(collectionRef.doc(), obj))
    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map( doc => {
        const { title, items } = doc.data();

        return {
            id: doc.id,
            routeName: encodeURI(title.toLowerCase()),
            title,
            items,
        }
    })
    return transformedCollection.reduce( (acc, collection) => ({
        ...acc,
        [collection.routeName]: collection
    }), {})
}

firebase.initializeApp(config);

export const getCurrectUser = () => {
    return new Promise(( resolve, reject) => {
        const  unsubscribe = auth.onAuthStateChanged( userAuth => {
            unsubscribe();
            console.log(' user auth ', userAuth )
            resolve(userAuth);
        }, reject)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export const signUpWithEmailAndPassword = ({ email, password }) => auth.createUserWithEmailAndPassword(email,password);

export default firebase;