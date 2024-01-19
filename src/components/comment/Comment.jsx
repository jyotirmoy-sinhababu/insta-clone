import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Comment = ({ comment }) => {
  return (
    <Flex gap={4}>
      <Flex direction={'column'}>
        <Flex gap={2}>
          <Text fontSize={14}>{comment.comment}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Comment;
