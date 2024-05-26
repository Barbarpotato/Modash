import { Box, Flex, Heading } from '@chakra-ui/react'
import { primaryTextColor, sideBarColor } from '../theme/globalTheme'
import { Link } from 'react-router-dom'

function SideBar({ menuList }) {
    return (
        <Box height={'100vh'} backgroundColor={sideBarColor} width={'15%'} textAlign={'center'}>

            <Heading my={6} textAlign={'center'} color={primaryTextColor} size={'sm'}>MODASH PROJECT</Heading>

            {
                menuList.map((item, index) => (
                    <Link key={index} to={item.path}>
                        <Flex justifyContent={'center'} alignItems={'center'}>
                            {item.icon}
                            <Heading ml={2} my={2} color={primaryTextColor} className='navbar' id="navigation" size='xs'>{item.name}</Heading>
                        </Flex>
                    </Link>
                ))
            }
        </Box >
    )
}

export default SideBar  