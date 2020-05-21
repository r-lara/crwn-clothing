import React, { Component } from 'react'
import SHOP_DATA from '../../data/shop.data'
import CollectionPreview from '../../components/collection-preview/collection-preview.component'

export class ShopPage extends Component {
    state = {
        collections: SHOP_DATA
    }
    render() {
        const { collections } = this.state
        return (
            <div className='shop-page'>
                SHOP PAGE
                {collections.map( ({...props}) => (
                    <CollectionPreview key={props.id} {...props}/>
                ))}
            </div>
        )
    }
}

export default ShopPage
