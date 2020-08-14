import React, { ReactElement } from 'react';
import { Comment } from 'interfaces';
import { Link } from 'react-router-dom';
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

  const { profile: currentProfile } = useSelector((state: RootState) => state);

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
      <Link to={`/profile/${profile.login}`}>
        <img alt="avatar" src={profile.avatarSmall} />
      </Link>
      <div className="post-comment-content">
        <div>
          <Link to={`/profile/${profile.login}`} className={profileNameCn}>{profile.login}</Link>
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
