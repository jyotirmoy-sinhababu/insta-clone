import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

import { Box, Image, Stack, Skeleton, Container } from '@chakra-ui/react';

import useGetUserById from '../../hooks/useGetUserById';

const FeedPost = ({ post }) => {
  const { isLoading, userProfile } = useGetUserById(post.createdBy);

  return (
    <Container rounded='md' gap={'4'}>
      {userProfile && <PostHeader post={post} createProfile={userProfile} />}

      <Box my={2} borderRadius={4} overflow={'hidden'}>
        <Image src={post.imageURL} alt='post' />
      </Box>
      <PostFooter post={post} createProfile={userProfile} />
    </Container>
  );
};

export default FeedPost;
