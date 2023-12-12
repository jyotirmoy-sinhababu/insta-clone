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
        </VStack>
      </Box>
    </>
  );
};

export default AuthForm;
