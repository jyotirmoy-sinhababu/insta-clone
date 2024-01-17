import {
  Box,
  Flex,
  Tooltip,
  Textarea,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import { CreatePostLogo } from '../../assets/Constants';

import { BsFillImageFill } from 'react-icons/bs';

const CreatePostLink = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip
        hasArrow
        label={'Create'}
        placement='right'
        ml={1}
        openDelay={500}
        display={{ base: 'block', md: 'none' }}
      >
        <Flex
          alignItems={'center'}
          gap={4}
          _hover={{ bg: 'whiteAlpha.400' }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: 'full' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: 'none', md: 'block' }}>Create</Box>
        </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />

        <ModalContent bg={'black'} border={'1px solid gray'}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea placeholder='Post caption...' />

            <Input type='file' hidden />

            <BsFillImageFill
              style={{
                marginTop: '15px',
                marginLeft: '5px',
                cursor: 'pointer',
              }}
              size={16}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3}>Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>{' '}
    </>
  );
};
export default CreatePostLink;
