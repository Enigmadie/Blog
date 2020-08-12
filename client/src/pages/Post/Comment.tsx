import React, { ReactElement } from 'react';
import { Comment } from 'interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { asyncActions, RootState } from 'slices';
import { getDistanceDate } from 'utils';
import cn from 'classnames';

interface Props {
  comment: Comment;
}

const CommentEl = ({ comment }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { removeComment } = asyncActions;

  const reduxState = useSelector((state: RootState) => state);
  const currentProfile = reduxState.profile;

  const removeHandler = (commentId: string): void => {
    dispatch(removeComment(commentId));
  };

  const {
    id,
    content,
    profile,
    createdAt,
  } = comment;

  const isEditor = profile.id === currentProfile.id || currentProfile.isAdmin;

  const commentDate = new Date(createdAt);
  const date = getDistanceDate(commentDate);

  const profileNameCn = cn({
    'admin-comment': profile.isAdmin === true,
  });

  return (
    <div className="post-comment" key={id}>
      <img alt="avatar" src={profile.avatarSmall} />
      <div className="post-comment-content">
        <div>
          <p className={profileNameCn}>{profile.login}</p>
          <p>{date}</p>
        </div>
        <p dangerouslySetInnerHTML={{ __html: content }} />
        {isEditor && (
        <button type="button" onClick={(): void => removeHandler(id)}>Delete</button>
        )}
      </div>
    </div>
  );
};

export default CommentEl;
