import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncActions, RootState } from 'slices';
import { RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useFormik } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import { find } from 'lodash';
import { Post, Categories } from 'interfaces';

import FileUpload from './FileUpload';
import MarkDown from './MarkDown';
import options from '../CategoriesSelect';

type TParams = {
  history: any;
  id: string;
  path: string;
}

const PostForm = ({ history, match }: RouteComponentProps<TParams>): ReactElement => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.posts);
  const { path, params } = match;
  const isEdited = /edit/gm.test(path);
  const editedPost: Post | undefined = find(data, { _id: params.id });

  const defaultPostData: Post = {
    _id: '',
    title: '',
    categories: [],
    preview: '',
    content: '',
    image: '',
    date: '',
  };

  const initialValues = editedPost !== undefined ? editedPost : defaultPostData;

  const { t } = useTranslation();
  const blankMsg = t('blank');
  const minSizeCategory = t('minSizeCategory');
  const maxSizeCategory = t('maxSizeCategory');

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      title: Yup
        .string()
        .max(60)
        .required(blankMsg),
      categories: Yup
        .array()
        .min(1, minSizeCategory)
        .max(3, maxSizeCategory),
      preview: Yup
        .string()
        .max(200)
        .required(blankMsg),
      content: Yup
        .string()
        .required(blankMsg),
    }),
    onSubmit: ({
      _id,
      title,
      categories,
      content,
      preview,
      image,
    }, { resetForm }) => {
      const formData = new FormData();
      const categoriesColl = categories.map((el: Categories): string => el.value);
      console.log(image);
      formData.append('image', image);
      formData.append('title', title);
      formData.append('categories', JSON.stringify(categoriesColl));
      formData.append('preview', preview);
      formData.append('content', content);
      formData.append('date', new Date().toString());
      isEdited
        ? dispatch(asyncActions.editPost(_id, formData))
        : dispatch(asyncActions.addPost(formData));
      setTimeout(() => history.push('/'), 500);
      resetForm();
    },
  });
  const {
    errors,
    setFieldValue,
    setFieldTouched,
    touched,
    isSubmitting,
    values,
    handleSubmit,
    handleChange,
  } = formik;

  const hasTitleErrors = errors.title && touched.title;
  const hasCategoriesErrors = errors.categories && touched.categories;
  const hasPreviewErrors = errors.preview && touched.preview;
  const hasContentErrors = errors.content && touched.content;

  const titleCn = cn({
    'content-input': true,
    error: hasTitleErrors,
  });

  const categoriesCn = cn({
    error: hasCategoriesErrors,
  });

  const previewCn = cn({
    'content-input': true,
    error: hasPreviewErrors,
  });

  const contentCn = cn({
    'content-input': true,
    error: hasContentErrors,
  });


  return (
    <div className="admin-form">
      <form onSubmit={handleSubmit}>
        <FileUpload prop={formik} />

        <label htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            value={values.title}
            className={titleCn}
            onChange={handleChange}
          />
          {hasTitleErrors && <div className="error-message">{errors.title}</div>}
        </label>

        <label htmlFor="categories">
          Categories:
          <Select
            name="categories"
            options={options}
            isMulti
            onChange={(value): void => setFieldValue('categories', value)}
            onBlur={(): void => setFieldTouched('categories', true)}
            value={values.categories}
            className={categoriesCn}
          />
          {hasCategoriesErrors && <div className="error-message">{errors.categories}</div>}
        </label>

        <label htmlFor="preview">
          Preview:
          <textarea
            name="preview"
            value={values.preview}
            rows={4}
            className={previewCn}
            onChange={handleChange}
          />
          {hasPreviewErrors && <div className="error-message">{errors.preview}</div>}
        </label>

        <MarkDown cn={contentCn} prop={formik} />
        {hasContentErrors && <div className="error-message">{errors.content}</div>}

        <button type="submit" disabled={isSubmitting}>Add</button>
      </form>
    </div>
  );
};

export default PostForm;
