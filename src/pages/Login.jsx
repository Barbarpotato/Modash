import React, { useState } from 'react'
import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import { hash } from '../utils/encryption';
import { useAuthContext } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { primaryTextColor } from '../theme/globalTheme';
import { checkUserCredentials, openDb } from '../api/IndexedDb';

function Login() {

    const [_authed, dispatch] = useAuthContext();

    const [userAccount, setUserAccount] = useState({ id: new Date().getTime(), username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');

        try {
            const hashedPassword = await hash(userAccount.password);

            // Get the database user object
            const db = await openDb();

            // Check if the user credentials are valid
            const isValidUser = await checkUserCredentials(db, userAccount.username, hashedPassword);

            // if valid, then navigate to the main content
            if (isValidUser) {
                // set the session for the user
                sessionStorage.setItem('auth', 'true');

                setLoginError('');
                dispatch({ type: 'login' });
                navigate('/');
            } else {
                setUserAccount({ id: new Date().getTime(), username: '', password: '' })
                setLoginError('Invalid User Credentials. Please Try Again.');
            }
        } catch (error) {
            alert("Invalid User Credentials. Please Try Again.");
            setLoginError('Invalid User Credentials. Please Try Again.');
        }
    }

    const handleRegister = () => {
        navigate('/register');
    }

    return (
        <Box backgroundColor={"#1c2940"} width={'100vw'} height={'100vh'} display={'flex'}
            justifyContent={'center'} alignItems={'center'}
            flexDirection={'column'} shadow={"kg"}>
            <Box boxShadow='dark-lg' width={'30%'}
                backgroundColor={"#0e131f"} p={3} rounded={'lg'}
                display={'flex'} flexDirection={'column'} gap={2}>
                <Heading my={2} textAlign={'center'} color={'#1ad3e4'}>Login</Heading>
                <Text color={'#1ad3e4'} mt={2}>Username:</Text>
                <Input
                    colorScheme='cyan'
                    variant={'flushed'}
                    color={primaryTextColor}
                    width={'100%'}
                    type="text"
                    value={userAccount.username}
                    onChange={(e) => setUserAccount({ ...userAccount, username: e.target.value })}
                />

                <Text color={'#1ad3e4'} mt={2}>Password:</Text>
                <Input variant={'flushed'}
                    colorScheme='cyan'
                    color={primaryTextColor}
                    type="password"
                    value={userAccount.password}
                    onChange={(e) => setUserAccount({ ...userAccount, password: e.target.value })}
                />

                <Button mt={2} py={2} variant={'link'} colorScheme='blue' onClick={handleLogin}>Login</Button>
                {loginError && <Box textAlign={'center'} color={"red"}>
                    <Text fontSize={'xs'}>
                        {loginError}
                    </Text>
                </Box>}

                <Text my={2} textAlign={'center'} color={"#1ad3e4"}>Dont have an account?
                    <Button ml={1}
                        onClick={handleRegister}
                        variant={'link'} colorScheme='blue'>
                        Create
                    </Button>
                </Text>
            </Box>

        </Box >
    )
}

export default Login