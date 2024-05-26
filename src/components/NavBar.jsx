import {
    Box, Flex, Spacer, Button, Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, useDisclosure
} from "@chakra-ui/react";
import { primaryBgColor } from "../theme/globalTheme";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
function NavBar() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    let navigate = useNavigate();

    const handleLogout = () => {

        // desotry the session for the user
        sessionStorage.removeItem('auth');

        // navigate to the login page
        navigate('/login');
    }

    return (
        <Fragment>
            <Flex backgroundColor={primaryBgColor} p={3} alignItems="center" boxShadow="md">
                <Spacer />
                <Box>
                    <Button colorScheme='teal' variant='ghost' color={'#1ad3e4'} onClick={onOpen}>
                        Logout
                    </Button>
                </Box>
            </Flex>

            <Modal variant={"purple"} backgroundColor={primaryBgColor} isCentered={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={'#1ad3e4'}>Logout Alert</ModalHeader>
                    <ModalCloseButton color={'#1ad3e4'} />
                    <ModalBody color={'#1ad3e4'}>
                        Are you sure you want to logout form the applicaiton?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={handleLogout}>
                            Logout
                        </Button>
                        <Button onClick={onClose} variant='ghost' color={'#1ad3e4'}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Fragment>



    );
}

export default NavBar;
