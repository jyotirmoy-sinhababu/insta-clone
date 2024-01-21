import {
  Avatar,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  Link,
} from '@chakra-ui/react';

import useGetUserById from '../../hooks/useGetUserById';

import { timeStamp } from '../../utils/timeStamp';

const Comment = ({ comment }) => {
  const { isLoading, userProfile } = useGetUserById(comment.createdBy);

  if (isLoading) {
    return <CommentSkeleton />;
  }

  console.log(userProfile);

  return (
    <Flex gap={4}>
      <Link to={`/${userProfile.userName}`}>
        <Avatar src={userProfile.profilePicURL} size={'sm'} />
      </Link>
      <Flex direction={'column'}>
        <Flex gap={2} flexDir={'column'}>
          <Text fontWeight={'bold'} fontSize={12}>
            {userProfile.userName}
          </Text>
          <Text fontSize={14}>{comment.comment}</Text>
        </Flex>
        <Text fontSize={12} color={'gray'}>
          {timeStamp(comment.createdAt)}
        </Text>
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
