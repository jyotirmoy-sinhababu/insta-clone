import { useState } from 'react';
import { useSelector } from 'react-redux';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

const useLikeOrUnlike = (post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useSelector((state) => state?.auth.user);

  const [isLiked, setIsLinked] = useState(post?.likes?.includes(authUser?.uid));
  const [likesCount, setLikesCount] = useState(post?.likes?.length);

  const showToast = useShowToast();

  const handleLikePost = async () => {
    if (isUpdating) return;

    if (!authUser) return showToast('Error', error.message, 'error');
    setIsUpdating(true);

    try {
      const postRef = await doc(firestore, 'posts', post.id);
      updateDoc(postRef, {
        likesCount: isLiked
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      });
      setIsLinked(!isLiked);
      isLiked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
    } catch (error) {
      showToast('Error', error.message, 'error');
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };
  return {
    isLiked,
    likesCount,
    handleLikePost,
    isUpdating,
  };
};

export default useLikeOrUnlike;
