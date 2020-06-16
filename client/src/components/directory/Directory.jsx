import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectDirectorySections } from '../../redux/directory/directory.selector'

import MenuItem from '../menu-item/menu-item.component'

import './Directory.styles.scss';

export const Directory = ({ sections }) => (
    <div className="directory-menu">
        { sections && sections.map( ({ id, ...someOtherProps }) => (
            <MenuItem key={id} {...someOtherProps} />
        ))}
    </div>
)

// const mapStateToProps = state => ({
//     sections: state.directory.sections
// })
const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory)
