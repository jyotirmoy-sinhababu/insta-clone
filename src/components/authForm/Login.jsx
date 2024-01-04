import { Input, Button } from '@chakra-ui/react';
import { Alert, AlertIcon } from '@chakra-ui/react';

import { useState } from 'react';

import uselogin from '../../hooks/uselogin';

const Login = () => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, loginUser } = uselogin();

  return (
    <>
      <Input
        placeholder='Email'
        type='email'
        fontSize={14}
        size={'sm'}
        value={inputs.email}
        onChange={(e) => {
          setInputs({ ...inputs, email: e.target.value });
        }}
      />
      <Input
        placeholder='Password'
        type={showPassword ? 'text' : 'password'}
        fontSize={14}
        size={'sm'}
        value={inputs.password}
        onChange={(e) => {
          setInputs({ ...inputs, password: e.target.value });
        }}
      />
      {error && (
        <Alert status='error' fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <Button
        w={'full'}
        colorScheme='blue'
        size={'sm'}
        fontSize={14}
        isLoading={loading}
        onClick={() => {
          loginUser(inputs);
        }}
      >
        Log in
      </Button>
    </>
  );
};

export default Login;
