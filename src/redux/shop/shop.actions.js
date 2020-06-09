import ShopActionTypes from './shop.types'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

// returns an "action" object
export const updateCollections = collectionsMap => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
})


// returns a "function" that dispaches multiple actions object
export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
})
export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})
export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        dispatch(fetchCollectionsStart());

        const collectionsRef = firestore.collection('collections')

        collectionsRef.get()
            .then( async snapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
                dispatch(fetchCollectionsSuccess(collectionsMap))
            })
            .catch( error => dispatch(fetchCollectionsFailure(error.message)))
    }
} 