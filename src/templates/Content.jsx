import { Box, HStack } from '@chakra-ui/react';
import { BsHouseFill, BsGearFill } from "react-icons/bs";
import { primaryBgColor, primaryTextColor } from '../theme/globalTheme';
import ProtectedRoute from '../components/ProtectedRoute';
import SideBar from "../components/SideBar"
import NavBar from "../components/NavBar"

function Content({ children }) {

    // ** Define Your Dashboard Menu List here
    const menuList = [
        {
            name: "Home", path: "/", icon: <BsHouseFill color={primaryTextColor} />
        },
        {
            name: "Setting", path: "/setting", icon: <BsGearFill color={primaryTextColor} />
        },
    ]

    return (
        <ProtectedRoute>
            <HStack backgroundColor={primaryBgColor} width={'100vw'} height={'100vh'} align={'top'}>

                <SideBar menuList={menuList} />

                <Box width={'85%'} backgroundColor={primaryBgColor}>
                    <NavBar />
                    <Box px={3} py={5}>
                        {children}
                    </Box>
                </Box>

            </HStack >
        </ProtectedRoute>
    )
}

export default Content