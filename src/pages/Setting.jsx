import { Heading } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import { primaryTextColor } from '../theme/globalTheme'

function Setting() {
    return (
        <Fragment>
            <Heading color={primaryTextColor}>This is a Setting page</Heading>
        </Fragment>
    )
}

export default Setting