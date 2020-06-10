import { takeLatest, call, put } from 'redux-saga/effects'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'

import ShopActionTypes from './shop.types'

export function* fetchCollectionsAsync() {
    yield console.log('i am fired')

    try {
        const collectionsRef = firestore.collection('collections')
        const snapshot = yield collectionsRef.get()
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}