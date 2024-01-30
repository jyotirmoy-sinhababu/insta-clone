import { Avatar, Box, Button, Flex, Tooltip, VStack } from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import useFollowUser from '../../hooks/useFollowUser';

const SuggestedUser = ({ user, setUser }) => {
  const authUser = useSelector((state) => state.auth.user);
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);

  const onFollowUser = async () => {
    await handleFollowUser();
  };

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} gap={20}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`/${user.userName}`}>
          <Avatar src={user.profilePicURL} size={'md'} />
        </Link>
        <VStack spacing={2} alignItems={'flex-start'}>
          <Link to={`/${user.userName}`}>
            {' '}
            <Box
              display={{ base: 'none', lg: 'block' }}
              fontSize={12}
              fontWeight={'bold'}
            >
              {user.fullName}
            </Box>{' '}
          </Link>

          <Box
            display={{ base: 'none', lg: 'block' }}
            fontSize={11}
            color={'gray.500'}
          >
            {user.followers.length} followers
          </Box>
        </VStack>
      </Flex>
      {authUser.uid !== user.uid ? (
        <Button
          fontSize={13}
          display={{ base: 'none', lg: 'block' }}
          bg={'transparent'}
          p={0}
          h={'max-content'}
          fontWeight={'medium'}
          color={'blue.400'}
          cursor={'pointer'}
          _hover={{ color: 'white' }}
          onClick={() => {
            onFollowUser();
          }}
          isLoading={isUpdating}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      ) : null}
    </Flex>
  );
};

export default SuggestedUser;
