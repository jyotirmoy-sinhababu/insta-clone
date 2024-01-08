import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  VStack,
  Text,
} from '@chakra-ui/react';

import { useSelector } from 'react-redux';

const ProfileHeader = () => {
  const userdata = useSelector((state) => state.profile.userProfile);
  const authUser = useSelector((state) => state.auth.user);

  const visitingOwnProfile =
    authUser && authUser.userName === userdata.userName;

  const visitingAnotherProfile =
    authUser && authUser.userName !== userdata.userName;

  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: 'column', sm: 'row' }}
    >
      <AvatarGroup
        size={{ base: 'xl', md: '2xl' }}
        justifySelf={'center'}
        alignSelf={'flex-start'}
        mx={'auto'}
      >
        <Avatar src={userdata.profilePicUrl} alt='As a programmer logo' />
      </AvatarGroup>
      <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
        <Flex
          gap={4}
          direction={{ base: 'column', sm: 'row' }}
          justifyContent={{ base: 'center', sm: 'flex-start' }}
          alignItems={'center'}
          w={'full'}
        >
          <Text fontSize={{ base: 'sm', md: 'lg' }}>{userdata.userName}</Text>
          {visitingOwnProfile && (
            <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
              <Button
                bg={'white'}
                color={'black'}
                _hover={{ bg: 'whiteAlpha.800' }}
                size={{ base: 'xs', md: 'sm' }}
              >
                Edit Profile
              </Button>
            </Flex>
          )}
          {visitingAnotherProfile && (
            <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
              <Button
                bg={'white'}
                color={'black'}
                _hover={{ bg: 'whiteAlpha.800' }}
                size={{ base: 'xs', md: 'sm' }}
              >
                Follow
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex
          alignItems={'center'}
          gap={{
            base: 2,
            sm: 4,
          }}
        >
          <Text>
            <Text as='span' fontWeight={'bold'} mr={1}>
              {userdata.posts.length}
            </Text>
            Posts
          </Text>
          <Text>
            <Text as='span' fontWeight={'bold'} mr={1}>
              {userdata.followers.length}
            </Text>
            Followers
          </Text>
          <Text>
            <Text as='span' fontWeight={'bold'} mr={1}>
              {userdata.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={'center'} gap={4}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {userdata.fullName}
          </Text>
        </Flex>
        <Text fontSize={'sm'}></Text>
      </VStack>
    </Flex>
  );
};

export default ProfileHeader;
