import { Heading } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import { primaryTextColor } from '../theme/globalTheme'

function Home() {

    return (
        <Fragment>
            <Heading color={primaryTextColor}>This is a Home page</Heading>
        </Fragment>
    )
}

export default Home