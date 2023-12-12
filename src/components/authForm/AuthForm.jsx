import React from 'react';
import { useState } from 'react';

import { Box, Flex, VStack, Text, Image } from '@chakra-ui/react';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box>
        <VStack>
          <Image src='/logo.png' h={24} cursor={'pointer'} alt='Instagram' />
        </VStack>
      </Box>
    </>
  );
};

export default AuthForm;
