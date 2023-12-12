import React from 'react';
import { useState } from 'react';

import { Box, Flex, VStack, Text, Image } from '@chakra-ui/react';
import Login from './Login';
import SignUp from './SignUp';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Box>
        <VStack>
          <Image src='/logo.png' h={24} cursor={'pointer'} alt='Instagram' />
          {isLogin ? <Login /> : <SignUp />}
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            my={4}
            gap={1}
            w={'full'}
          >
            <Box flex={2} h={'1px'} bg={'gray.400'} />
            <Text mx={1} color={'white'}>
              OR
            </Text>
            <Box flex={2} h={'1px'} bg={'gray.400'} />
          </Flex>
        </VStack>
      </Box>
      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            color={'blue.500'}
            cursor={'pointer'}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
