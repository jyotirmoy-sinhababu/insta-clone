import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  VStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';

import useFollowUser from '../../hooks/useFollowUser';

const ProfileHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userdata = useSelector((state) => state.profile.userProfile);
  const authUser = useSelector((state) => state.auth.user);
  const visitingOwnProfile =
    authUser && authUser.userName === userdata.userName;

  const visitingAnotherProfile =
    authUser && authUser.userName !== userdata.userName;

  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    userdata?.uid
  );

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
        <Avatar src={userdata.profilePicURL} alt='profile pic' />
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
                onClick={onOpen}
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
                onClick={handleFollowUser}
                isLoading={isUpdating}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
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
          {userdata.posts.length > 0 ? (
            <Text as='span' fontWeight={'bold'} mr={1}>
              {userdata.posts.length} Posts
            </Text>
          ) : (
            <Text>0 Posts </Text>
          )}

          {userdata.followers.length > 0 ? (
            <Text as='span' fontWeight={'bold'} mr={1}>
              {userdata.followers.length} Followers
            </Text>
          ) : (
            <Text>0 Followers</Text>
          )}

          {userdata.following.length > 0 ? (
            <Text as='span' fontWeight={'bold'} mr={1}>
              {userdata.following.length} Following
            </Text>
          ) : (
            <Text>0 Following</Text>
          )}
        </Flex>

        <Flex alignItems={'center'} gap={4}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {userdata.fullName}
          </Text>
        </Flex>
        <Text fontSize={'sm'}>{userdata.bio}</Text>
      </VStack>
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default ProfileHeader;
