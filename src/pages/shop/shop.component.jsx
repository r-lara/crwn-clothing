import React, { useEffect } from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from '../collection/collection.contianer'

import { fetchCollectionsStart } from '../../redux/shop/shop.actions'

const ShopPage = ({ match, fetchCollectionsStart }) => {

    useEffect(() => {
        fetchCollectionsStart();
        // return () => {
        //     // mimics component will unmount
        //     // this is called a 'clean up function'
        // }
    }, [fetchCollectionsStart])

    return (
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
            {/* <Route path={`${match.path}/:collectionId`} render={ (props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} { ...props } />} /> */}
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps )(ShopPage)