import { useState, useRef } from 'react';

import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';

import { CreatePostLogo } from '../../assets/Constants';
import { BsFillImageFill } from 'react-icons/bs';

import usePreviewImg from '../../hooks/usePreviewImg';

import useShowToast from '../../hooks/useShowToast';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../slice/PostSlice';
import { addPost } from '../../slice/UserProfileSlice';
import { useLocation } from 'react-router-dom';

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { firestore, storage } from '../../firebase/Firebase';

const CreatePostLink = () => {
  const [caption, setCaption] = useState('');
  const imgRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedFile, setSelectedFile, handleImg } = usePreviewImg();

  const { isLoading, handleCreatePost } = postCreation();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption('');
      setSelectedFile(null);
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

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
            <Textarea
              placeholder='Post caption...'
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
            />

            <Input type='file' hidden ref={imgRef} onChange={handleImg} />

            <BsFillImageFill
              style={{
                marginTop: '15px',
                marginLeft: '5px',
                cursor: 'pointer',
              }}
              size={16}
              onClick={() => {
                imgRef.current.click();
              }}
            />
            {selectedFile && (
              <Flex
                mt={5}
                w={'full'}
                position={'relative'}
                justifyContent={'center'}
              >
                <Image src={selectedFile} alt='Selected img' />
                <CloseButton
                  position={'absolute'}
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={handlePostCreation} isLoading={isLoading} mr={3}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>{' '}
    </>
  );
};
export default CreatePostLink;

const postCreation = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState();
  const authUser = useSelector((state) => state.auth.user);
  const userProfile = useSelector((state) => state.profile.userProfile);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error('Please select an image');
    setIsLoading(true);
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);
      const userDocRef = doc(firestore, 'users', authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      if (userProfile.uid === authUser.uid)
        dispatch(createPost({ ...newPost, id: postDocRef.id }));

      if (pathname !== '/' && userProfile.uid === authUser.uid)
        dispatch(addPost({ ...newPost, id: postDocRef.id }));

      showToast('Success', 'Post created successfully', 'success');
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
};
