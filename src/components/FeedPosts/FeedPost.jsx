import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

import { Box, Image } from '@chakra-ui/react';

const FeedPost = ({ post }) => {
  console.log(post);
  return (
    <>
      {/* <PostHeader post={post} /> */}
      <Box my={2} borderRadius={4} overflow={'hidden'}>
        <Image src={post.imageURL} alt='post' />
      </Box>
      {/* <PostFooter /> */}
    </>
  );
};

export default FeedPost;
