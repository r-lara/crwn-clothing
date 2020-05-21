import React from 'react'
import './collection-preview.styles.scss'

import CollectionItem from '../collection-item/collection-item.component'

const CollectionPreview = (props) => {
    console.log('collection preview', props);
    const { title = '', items = [] } = props;
    return (
        <div className='collection-preview'>
            <h1>{title}</h1>
            <div className="preview">
                {items.filter((item, idx) => idx < 4).map( item => (
                    <CollectionItem key={item.id} {...item}/>
                ))}
            </div>
        </div>
    )
}

export default CollectionPreview
