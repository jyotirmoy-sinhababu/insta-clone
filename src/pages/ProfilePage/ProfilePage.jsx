import {
  Container,
  Flex,
  Text,
  Link,
  Skeleton,
  SkeletonCircle,
  VStack,
} from '@chakra-ui/react';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileTabs from '../../components/Profile/ProfileTabs';
import ProfilePosts from '../../components/Profile/ProfilePosts';

import useGetUserProfileByUsername from '../../hooks/useGetUserProfileByUsername';

import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const { username } = useParams();
  console.log(username);
  const { isLoading } = useGetUserProfileByUsername(username);
  const userdata = useSelector((state) => state.profile.userProfile);

  const userNotFound = !isLoading && !userdata;
  if (userNotFound) {
    return <UserNotFond />;
  }

  return (
    <Container maxW='container.lg' py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={'full'}
        mx={'auto'}
        flexDirection={'column'}
      >
        {!isLoading && userdata && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={'full'}
        mx={'auto'}
        borderTop={'1px solid'}
        borderColor={'whiteAlpha.300'}
        direction={'column'}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

export default ProfilePage;

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: 'column', sm: 'row' }}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <SkeletonCircle size='24' />

      <VStack
        alignItems={{ base: 'center', sm: 'flex-start' }}
        gap={2}
        mx={'auto'}
        flex={1}
      >
        <Skeleton height='12px' width='150px' />
        <Skeleton height='12px' width='100px' />
      </VStack>
    </Flex>
  );
};

const UserNotFond = () => {
  return (
    <Flex flexDir='column' textAlign={'center'} mx={'auto'}>
      <Text fontSize={'2xl'}>User Not Fond</Text>
      <Link
        as={RouterLink}
        to={'/'}
        color={'blue.500'}
        w={'max-content'}
        mx={'auto'}
      >
        Go home
      </Link>
    </Flex>
  );
};
