import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { useFormik } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import { find } from 'lodash';
import connect from '../../connect';
import FileUpload from './FileUpload.jsx';
import MarkDown from './MarkDown.jsx';
import options from './CategoriesSelect.jsx';

const PostForm = ({
  history,
  addPost,
  editPost,
  match,
}) => {
  const { data } = useSelector((state) => state.posts);
  const { path, params } = match;
  const isEdited = /edit/gm.test(path);
  const editedPost = find(data, { _id: params.id });
  const post = isEdited ? editedPost : null;

  const formik = useFormik({
    initialValues: {
      id: isEdited ? post._id : null,
      title: isEdited ? post.title : '',
      categories: isEdited ? post.categories : [],
      preview: isEdited ? post.preview : '',
      content: isEdited ? post.content : '',
      file: isEdited ? post.image : null,
      date: isEdited ? post.date : new Date(),
    },
    validationSchema: Yup.object().shape({
      title: Yup
        .string(60)
        .required('Can\'t be blank'),
      categories: Yup
        .array()
        .min(1, 'Pick at least 1 category')
        .max(3, 'Pick no more than 3 categories'),
      preview: Yup
        .string()
        .max(200)
        .required('Can\'t be blank'),
      content: Yup
        .string()
        .required('Can\'t be blank'),
    }),
    onSubmit: async ({
      id,
      title,
      categories,
      content,
      preview,
      file,
      date,
    }, { resetForm }) => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', title);
      formData.append('categories', JSON.stringify(categories));
      formData.append('preview', preview);
      formData.append('content', content);
      formData.append('date', date);
      isEdited
        ? await editPost(id, { formData })
        : await addPost({ formData });
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
            onChange={(value) => setFieldValue('categories', value)}
            onBlur={() => setFieldTouched('categories', true)}
            value={values.categories}
            className={categoriesCn}
          />
          {hasCategoriesErrors && <div className="error-message">{errors.categories}</div>}
        </label>

        <label htmlFor="preview">
          Preview:
          <input
            type="text"
            name="preview"
            value={values.preview}
            as="textarea"
            rows="4"
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

export default connect()(PostForm);
