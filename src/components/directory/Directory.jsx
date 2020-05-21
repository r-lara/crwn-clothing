import React, { Component } from 'react'
import './Directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component'
import SECTIONS_DATA from '../../data/sections.data'
export class Directory extends Component {
    state = {
        sections: SECTIONS_DATA
    }
    render() {
        return (
            <div className="directory-menu">
                { this.state.sections && this.state.sections.map( ({ id, ...someOtherProps }) => (<MenuItem key={id} {...someOtherProps} />)) }
            </div>
        )
    }
}

export default Directory
