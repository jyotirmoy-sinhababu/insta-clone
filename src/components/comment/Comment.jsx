import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';

import useGetUserById from '../../hooks/useGetUserById';

const Comment = ({ comment }) => {
  const { isLoading, userProfile } = useGetUserById(comment.createdBy);

  if (isLoading) {
    return <CommentSkeleton />;
  }

  return (
    <Flex gap={4}>
      <Avatar src={userProfile.imageURL} size={'sm'} />
      <Flex direction={'column'}>
        <Flex gap={2} flexDir={'column'}>
          <Text fontWeight={'bold'} fontSize={12}>
            {userProfile.fullName}
          </Text>
          <Text fontSize={14}>{comment.comment}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Comment;

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={'full'} alignItems={'center'}>
      <SkeletonCircle h={10} w={'10'} />
      <Flex gap={1} flexDir={'column'}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};
