import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import useFollowUser from '../../hooks/useFollowUser';

const PostHeader = ({ post, createProfile }) => {
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    post.createdBy
  );

  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      w={'full'}
      my={2}
    >
      <Flex alignItems={'center'} gap={2}>
        <Link to={`/${createProfile.userName}`}>
          <Avatar
            src={createProfile.profilePicURL}
            alt='user profile pic'
            size={'sm'}
          />
        </Link>

        <Flex fontSize={12} fontWeight={'bold'} gap='2'>
          <Link to={`${createProfile.userName}`}>{createProfile.userName}</Link>

          <Box color={'gray.500'}>.1w</Box>
        </Flex>
      </Flex>
      <Box cursor={'pointer'}>
        <Button
          size={'xs'}
          bg={'transparent'}
          fontSize={12}
          color={'blue.500'}
          fontWeight={'bold'}
          _hover={{ color: 'white' }}
          transition={'0.2s ease-in-put'}
          onClick={handleFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? 'unfolow' : 'follow'}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
