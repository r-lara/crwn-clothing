import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import { updateCollections } from '../../redux/shop/shop.actions'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends Component {

    unsubscribeFromSnapshot = null;

    state = {
        loading: true
    }

    componentDidMount(){
        const { updateCollectionsPropsFunc } = this.props
        const collectionsRef = firestore.collection('collections')

        this.unsubscribeFromSnapshot = collectionsRef.get()
            .then( async snapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
                console.log('collectionsMap', collectionsMap)
                console.log('unsubscribeFromSnapshot inside', this.unsubscribeFromSnapshot)
                updateCollectionsPropsFunc(collectionsMap)
                this.setState({ loading: false })
            })
        console.log('unsubscribeFromSnapshot', this.unsubscribeFromSnapshot)
    }

    // componentWillUnmount(){
    //     this.unsubscribeFromSnapshot()
    // }

    render(){
        const { match } = this.props
        const { loading } = this.state

        return (
            <div className='shop-page'>
                {/* <Route exact path={`${match.path}`} component={CollectionsOverviewWithSpinner} /> */}
                {/* <Route path={`${match.path}/:collectionId`} component={CollectionPageWithSpinner} /> */}
                <Route exact path={`${match.path}`} render={ (props) => <CollectionsOverviewWithSpinner isLoading={loading} { ...props } />} />
                <Route path={`${match.path}/:collectionId`} render={ (props) => <CollectionPageWithSpinner isLoading={loading} { ...props } />} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollectionsPropsFunc: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps )(ShopPage)