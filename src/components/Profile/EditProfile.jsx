import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';

import { useState, useRef } from 'react';

import { useSelector } from 'react-redux';

const EditProfile = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',
    bio: '',
  });
  const fileRef = useRef();

  const authUser = useSelector((state) => state.auth.user);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={'black'}
          boxShadow={'xl'}
          border={'1px solid grey'}
          mx={3}
        >
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <Flex bg={'black'}>
              <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={'black'}
                p={6}
                my={0}
              >
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                  Edit Profile
                </Heading>
                <FormControl>
                  <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                      <Avatar
                        size='xl'
                        // src={selectedFile || authUser.profilePicURL}
                        border={'2px solid white '}
                      />
                    </Center>
                    <Center w='full'>
                      <Button w='full' onClick={() => fileRef.current.click()}>
                        Edit Profile Picture
                      </Button>
                    </Center>
                    <Input type='file' hidden ref={fileRef} onChange={{}} />
                  </Stack>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={'sm'}>Full Name</FormLabel>
                  <Input
                    placeholder={'Full Name'}
                    size={'sm'}
                    type={'text'}
                    value={inputs.fullName || authUser.fullName}
                    onChange={(e) =>
                      setInputs({ ...inputs, fullName: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={'sm'}>Username</FormLabel>
                  <Input
                    placeholder={'Username'}
                    size={'sm'}
                    type={'text'}
                    value={inputs.username || authUser.username}
                    onChange={(e) =>
                      setInputs({ ...inputs, username: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={'sm'}>Bio</FormLabel>
                  <Input
                    placeholder={'Bio'}
                    size={'sm'}
                    type={'text'}
                    value={inputs.bio || authUser.bio}
                    onChange={(e) =>
                      setInputs({ ...inputs, bio: e.target.value })
                    }
                  />
                </FormControl>

                <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                    bg={'red.400'}
                    color={'white'}
                    w='full'
                    size='sm'
                    _hover={{ bg: 'red.500' }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    size='sm'
                    w='full'
                    _hover={{ bg: 'blue.500' }}
                    onClick={{}}
                    isLoading={false}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
