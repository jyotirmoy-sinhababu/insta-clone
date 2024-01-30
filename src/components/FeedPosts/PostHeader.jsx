import { Avatar, Box, Button, Flex, SkeletonCircle } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import useFollowUser from '../../hooks/useFollowUser';
import { timeStamp } from '../../utils/timeStamp';

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
        {createProfile ? (
          <Link to={`/${createProfile.userName}`}>
            <Avatar
              src={createProfile.profilePicURL}
              alt='user profile pic'
              size={'sm'}
            />
          </Link>
        ) : (
          <SkeletonCircle size='10' />
        )}

        <Flex fontSize={12} fontWeight={'bold'} gap='2'>
          <Link to={`${createProfile.userName}`}>{createProfile.userName}</Link>

          <Box color={'gray.500'}>.{timeStamp(post.createdAt)}</Box>
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
