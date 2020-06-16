
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { selectIsCollectionsFetching } from '../../redux/shop/shop.selector'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionsOverview from './collections-overview.component'


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetching
})

// export default connect(mapStateToProps)(WithSpinner(CollectionsOverview))
const CollectionsOverviewContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionsOverview)
export default CollectionsOverviewContainer