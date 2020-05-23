import React from 'react'
import './menu-item.styles.scss';
import { withRouter } from 'react-router-dom'

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match, location }) => {
    // console.log('menu item props ', {history, match, location})
    // onClick={() => { history.push(`${match.url}${linkUrl}`) }}
    
    return (
        <div className={`${size} menu-item`} >
            <div 
                className='background-image' 
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className="content">
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    )
}

export default withRouter(MenuItem)