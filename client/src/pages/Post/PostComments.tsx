import React, { useEffect, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CommentFormik } from 'interfaces';
import cn from 'classnames';

import { asyncActions, RootState } from 'slices';

type TParams = { id: string };

const PostComments = ({ id }: TParams): ReactElement => {
  const dispatch = useDispatch();
  const { fetchActivePostComments } = asyncActions;
  const { activePost: { comments } } = useSelector((state: RootState) => state);

  const initialValues: CommentFormik = {
    content: '',
  };

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
      dispatch(asyncActions.addComment(id, content));
      resetForm();
    },
  });

  useEffect(() => {
    dispatch(fetchActivePostComments(id));
    console.log(comments);
  }, []);

  const {
    errors,
    touched,
    handleSubmit,
    handleChange,
    isSubmitting,
    values,
  } = formik;

  const hasContentErrors = errors.content && touched.content;

  const contentCn = cn({
    'content-input': true,
    error: hasContentErrors,
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="content"
          name="content"
          value={values.content}
          onChange={handleChange}
          className={contentCn}
        />
        <button type="submit" className="blog-submit" disabled={isSubmitting}>
          Add
        </button>
      </form>
      <div className="post-comments">
        {comments.map((comment) => (
          <p>{comment}</p>
        ))}
      </div>
    </>
  );
};

export default PostComments;
