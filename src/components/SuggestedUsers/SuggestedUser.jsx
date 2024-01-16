import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react';
import { useState } from 'react';

const SuggestedUser = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState();
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
          setIsFollowing(!isFollowing);
        }}
        // isLoading={isUpdating}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </Flex>
  );
};

export default SuggestedUser;
