import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react';

import { useSelector } from 'react-redux';

import useFollowUser from '../../hooks/useFollowUser';

const SuggestedUser = ({ user, setUser }) => {
  const authUser = useSelector((state) => state.auth.user);
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);

  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower.uid !== authUser.uid)
        : [...user.followers, authUser],
    });
  };

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Avatar src={user.profilePicURL} size={'md'} />
        <VStack spacing={2} alignItems={'flex-start'}>
          <Box fontSize={12} fontWeight={'bold'}>
            {user.fullName}
          </Box>
          <Box fontSize={11} color={'gray.500'}>
            {user.followers.length} followers
          </Box>
        </VStack>
      </Flex>
      {authUser.uid !== user.uid ? (
        <Button
          fontSize={13}
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
