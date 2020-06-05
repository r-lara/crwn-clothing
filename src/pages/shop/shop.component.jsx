import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import { updateCollections } from '../../redux/shop/shop.actions'

class ShopPage extends Component {

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollectionsPropsFunc } = this.props
        const collectionsRef = firestore.collection('collections')

        this.unsubscribeFromSnapshot = collectionsRef.get()
            .then( async snapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
                console.log('collectionsMap', collectionsMap)
                console.log('unsubscribeFromSnapshot inside', this.unsubscribeFromSnapshot)
                updateCollectionsPropsFunc(collectionsMap)
            })
        console.log('unsubscribeFromSnapshot', this.unsubscribeFromSnapshot)
    }

    render(){
        const { match } = this.props
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollectionsPropsFunc: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps )(ShopPage)