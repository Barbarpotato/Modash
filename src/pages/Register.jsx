import React, { useState } from 'react'
import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import { hash } from '../utils/encryption';
import { useAuthContext } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { primaryTextColor } from '../theme/globalTheme';
import { checkUserCredentials, openDb, addUserAccount } from '../api/IndexedDb';


const Register = () => {
    const [_authed, dispatch] = useAuthContext();

    const [userAccount, setUserAccount] = useState({
        id: new Date().getTime(), username: '',
        password: '', rePassword: ''
    });
    const [loginError, setLoginError] = useState('');

    let navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        //* Validate the user input
        if (!userAccount.username || !userAccount.password || !userAccount.rePassword) {
            setLoginError('All Input Fields Are Required. Please Try Again');
            return;
        }

        if (userAccount.password !== userAccount.rePassword) {
            setLoginError('Password Do Not Match. Please Try Again.');
            setUserAccount({
                id: new Date().getTime(), username: '',
                password: '', rePassword: ''
            })
            return;
        }

        try {
            setLoginError('');
            const hashedPassword = await hash(userAccount.password);
            const updatedUserAccount = { ...userAccount, password: hashedPassword };

            // Get the database user object
            const db = await openDb();

            // Check if the user credentials are valid
            const isValidUser = await checkUserCredentials(db, userAccount.username, hashedPassword);

            // if valid, then this account already registered. declined the act of register
            if (isValidUser) throw new Error('User already registered');

            // Use the database object to add user account
            await addUserAccount(db, updatedUserAccount);

            // set the session for the user
            sessionStorage.setItem('auth', 'true');

            // Redirect to dashboard or perform other actions for successful registration
            dispatch({ type: 'login' });
            navigate('/');
        } catch (error) {
            alert('Error adding user account: ' + error);
            setLoginError('An error occurred while adding user account');
        }
    };

    const handleLogin = () => {
        navigate('/login');
    }


    return (
        <Box backgroundColor={"#1c2940"} width={'100vw'} height={'100vh'} display={'flex'}
            justifyContent={'center'} alignItems={'center'}
            flexDirection={'column'} shadow={"kg"}>
            <Box boxShadow='dark-lg' width={'30%'}
                backgroundColor={"#0e131f"} p={3} rounded={'lg'}
                display={'flex'} flexDirection={'column'} gap={2}>
                <Heading my={2} textAlign={'center'} color={'#1ad3e4'}>Register</Heading>
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

                <Text color={'#1ad3e4'} mt={2}>Re-type Passsword:</Text>
                <Input variant={'flushed'}
                    colorScheme='cyan'
                    color={primaryTextColor}
                    type="password"
                    value={userAccount.rePassword}
                    onChange={(e) => setUserAccount({ ...userAccount, rePassword: e.target.value })}
                />

                <Button mt={2} py={2} variant={'link'} colorScheme='blue' onClick={handleRegister}>Create</Button>
                {loginError && <Box textAlign={'center'} color={"red"}>
                    <Text fontSize={'xs'}>
                        {loginError}
                    </Text>
                </Box>}

                <Text my={2} textAlign={'center'} color={"#1ad3e4"}>Already have an account?
                    <Button ml={1}
                        onClick={handleLogin}
                        variant={'link'} colorScheme='blue'>
                        Login
                    </Button>
                </Text>
            </Box>

        </Box >
    );
};

export default Register;
