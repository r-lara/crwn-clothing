import React from 'react'
import './homepage.styles.scss'

import Directory from '../../components/directory/Directory'
import { HomePageContainer } from './homepage.styles'

const HomePage = props => {
    
    return (
        <HomePageContainer>
            <Directory />
        </HomePageContainer>
    )
}

export default HomePage