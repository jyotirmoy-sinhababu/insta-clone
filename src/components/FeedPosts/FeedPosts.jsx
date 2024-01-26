import { Container, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react';

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
                <Skeleton height='10px' w={'200px'} />
                <Skeleton height='10px' w={'200px'} />
              </VStack>
            </Flex>
          </VStack>;
        })}
    </Container>
  );
};

export default FeedPosts;
