import { takeLatest, all, put, call } from 'redux-saga/effects'

import { UserActionTypes } from '../user/user.types';
import { clearCart } from './cart.actions'

export function* clearCartOnSingOut() {
    yield put(clearCart());
}

export function* onSingOutSucces() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSingOut)
}

export function* cartSagas() {
    yield all([
        call(onSingOutSucces),
    ])
}