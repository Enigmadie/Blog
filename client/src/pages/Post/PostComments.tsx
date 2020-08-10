import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CommentFormik, Comment } from 'interfaces';
import cn from 'classnames';

import { asyncActions, RootState } from 'slices';
import MarkDown from './MarkDown';

type TParams = { id: string };

const PostComments = ({ id }: TParams): ReactElement => {
  const dispatch = useDispatch();
  const { activePost: { comments }, profile } = useSelector((state: RootState) => state);

  const initialValues: CommentFormik = {
    content: '',
  };

  const { removeComment, addComment } = asyncActions;

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      content: Yup
        .string()
        .max(50000),
    }),
    onSubmit: ({
      content,
    }, { resetForm }) => {
      dispatch(addComment(id, profile.id, content));
      resetForm();
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
  } = formik;

  const hasContentErrors = errors.content && touched.content;

  const contentCn = cn({
    'content-input': true,
    error: hasContentErrors,
  });

  const removeHandler = (commentId: string): void => {
    dispatch(removeComment(commentId));
  };

  return (
    <>
      <div className="post-comments-form">
        <form onSubmit={handleSubmit}>
          <div className="post-comments-counter">
            Comments:
            {comments.length}
          </div>
          <div className="post-comments-markdown">
            <MarkDown cn={contentCn} prop={formik} />
            <button type="submit" className="blog-submit" disabled={isSubmitting}>
              Add
            </button>
          </div>
        </form>
      </div>
      <div className="post-comments-wrapper">
        {comments.map((comment: Comment) => (
          <div className="post-comment" key={comment.id}>
            <div>{comment.profile.login}</div>
            <p dangerouslySetInnerHTML={{ __html: comment.content }} />
            <button type="button" onClick={(): void => removeHandler(comment.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostComments;
