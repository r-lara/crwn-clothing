import { takeLatest, put, all, call } from 'redux-saga/effects'

import { UserActionTypes } from './user.types'

import { auth, googleProvider, createUserProfileDocument, getCurrectUser } from './../../firebase/firebase.utils'
import { 
    signInSuccess, signInFailure
} from './user.actions';


export function* getSnapshotFromUser(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnaphot = yield userRef.get()
    
        yield put(signInSuccess({ id: userSnaphot.id, ...userSnaphot.data() }))
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle(){
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUser(user)

    } catch (error) {
        yield put(signInFailure(error))
    }
}
export function* signInWithEmail({ payload: { email, password }}){
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUser(user);
        
    } catch (error) {
        yield put(signInFailure(error))
    }
}
export function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrectUser()
        if( !userAuth ) return;
        yield getSnapshotFromUser(userAuth)

    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSingInStart() {
    yield takeLatest( UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSingInStart() {
    yield takeLatest( UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest( UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas(){
    yield all([
        call(onGoogleSingInStart), 
        call(onEmailSingInStart), 
        call(onCheckUserSession), 
    ]);
}