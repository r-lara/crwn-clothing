import React from 'react'
import './menu-item.styles.scss';
import { withRouter } from 'react-router-dom'

// const MenuItem = ({ title, subtitle = 'SHOP NOW', imageUrl, size, linkUrl, history, match }) => {
const MenuItem = ({ title, subtitle = 'SHOP NOW', imageUrl, size, linkUrl, history, match, location }) => {
    console.log('menu item props ', {history, match, location})
    return (
        <div className={`${size} menu-item`} onClick={() => { history.push(`${match.url}${linkUrl}`) }}>
            <div className='background-img' style={{
                backgroundImage: `url(${imageUrl})`
            }}></div>
            <div className="content">
                <h1 className="title">{title}</h1>
                <span className="subtitle">{subtitle}</span>
            </div>
        </div>
    )
}

export default withRouter(MenuItem)