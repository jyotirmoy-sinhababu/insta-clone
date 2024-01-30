import {
  Box,
  Container,
  Skeleton,
  SkeletonCircle,
  VStack,
  Flex,
  Text,
} from '@chakra-ui/react';

import useGetFeedPost from '../../hooks/useGetFeedPost';

import FeedPost from './FeedPost';

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPost();
  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {isLoading &&
        [1, 2, 3].map((_, index) => {
          <VStack key={index} gap={4} alignItems={'flex-start'} mb={10}>
            <Flex gap='2'>
              <SkeletonCircle size='10' />
              <VStack gap={2} alignItems={'flex-start'}>
                <Skeleton height='400px' w={'200px'} />
                <Skeleton height='400px' w={'200px'} />
              </VStack>
            </Flex>
            <Skeleton w={'full'}>
              <Box h={'400px'}>contents wrapped</Box>
            </Skeleton>
          </VStack>;
        })}
      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => (
          <Container key={post.id} sx={{ gap: '18px' }}>
            <FeedPost post={post} />
          </Container>
        ))}
      {!isLoading && posts.length === 0 && (
        <Container
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text fontSize={'2xl'}>Follow users to see their post.</Text>
        </Container>
      )}
    </Container>
  );
};

export default FeedPosts;
