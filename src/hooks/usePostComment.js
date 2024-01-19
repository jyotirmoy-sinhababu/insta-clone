import { useState } from 'react';
import useShowToast from './useShowToast';

import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../slice/PostSlice';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

const usePostComment = ({ postId }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleComment = async ({ postId, comment }) => {
    if (isCommenting) return;
    if (!authUser) showToast('Error', 'you are not logged in', 'error');
    setIsCommenting(true);

    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };
    try {
      await updateDoc(doc(firestore, 'postId'), {
        comments: arrayUnion(newComment),
      });
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsCommenting(false);
    }
  };
};

export default usePostComment;
