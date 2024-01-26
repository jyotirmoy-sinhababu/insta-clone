import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

import { Box, Image } from '@chakra-ui/react';

import useGetUserById from '../../hooks/useGetUserById';

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserById(post.createdBy);

  return (
    <>
      {userProfile && <PostHeader post={post} createProfile={userProfile} />}

      <Box my={2} borderRadius={4} overflow={'hidden'}>
        <Image src={post.imageURL} alt='post' />
      </Box>
      {/* <PostFooter /> */}
    </>
  );
};

export default FeedPost;
