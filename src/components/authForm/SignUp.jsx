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
      <Input />
      <Input />
      <Input />
      <Button></Button>
    </>
  );
};

export default SignUp;
