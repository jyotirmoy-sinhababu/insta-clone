import { useState } from 'react';

import { Input, Button } from '@chakra-ui/react';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
  });

  return (
    <>
      <Input
        placeholder='Email'
        type='email'
        size={'sm'}
        value={inputs.email}
      />
      <Input
        placeholder='Username'
        type='text'
        size={'sm'}
        value={inputs.userName}
      />
      <Input
        placeholder='Full Name'
        type='text'
        size={'sm'}
        value={inputs.fullName}
      />
      <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14}>
        Sign up
      </Button>
    </>
  );
};

export default SignUp;
