import { takeLatest, put, all, call } from 'redux-saga/effects'

import { UserActionTypes } from './user.types'

import { auth, googleProvider, createUserProfileDocument, getCurrectUser } from './../../firebase/firebase.utils'
import { 
    signInSuccess, signInFailure,
    signOutSuccess, signOutFailure,
    signUpSuccess, signUpFailure,
} from './user.actions';


export function* getSnapshotFromUser(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
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

export function* singOut(){
    try {
       yield auth.signOut()
       yield put(signOutSuccess())
    } catch (error) {
       yield put(signOutFailure(error))
    }
}

export function* singUp({ payload: { email, password, displayName }}){
    try {
        // console.log('\n## catched sign up func', email, password)
        const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        yield put(signUpSuccess({ user, additionalData: { displayName }}))

    } catch (error) {
        yield put(signUpFailure(error))
    }
}
export function* signInAfterSignUp({ payload: { user, additionalData }}){
    try {
        yield getSnapshotFromUser(user, additionalData)
    } catch (error) {
        yield put(signUpFailure(error))
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
export function* onSignOutStart() {
    yield takeLatest( UserActionTypes.SIGN_OUT_START, singOut )
}
export function* onSignUpStart() {
    yield takeLatest( UserActionTypes.SIGN_UP_START, singUp )
}
export function* onSignUpSuccess() {
    yield takeLatest( UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp );
}

export function* userSagas(){
    yield all([
        call(onGoogleSingInStart), 
        call(onEmailSingInStart), 
        call(onCheckUserSession), 
        call(onSignOutStart), 
        call(onSignUpStart),
        call(onSignUpSuccess),
    ]);
}