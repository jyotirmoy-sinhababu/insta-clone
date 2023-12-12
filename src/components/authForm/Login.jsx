import { Input, Button } from '@chakra-ui/react';

import { useState } from 'react';

const Login = () => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  return (
    <>
      <Input
        placeholder='Email'
        type='email'
        fontSize={14}
        size={'sm'}
        value={inputs.email}
        onChange={(e) => {
          setInputs({ ...inputs, email: e.target.email });
        }}
      />
      <Input
        placeholder='Password'
        type='password'
        fontSize={14}
        size={'sm'}
        value={inputs.password}
        onChange={(e) => {
          setInputs({ ...inputs, email: e.target.password });
        }}
      />
      <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14}>
        Log in
      </Button>
    </>
  );
};

export default Login;
