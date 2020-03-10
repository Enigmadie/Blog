import React from 'react';
import cn from 'classnames';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import connect from '../../connect';
import FileUpload from './FileUpload.jsx';
import MarkDown from './MarkDown.jsx';
import options from './CategoriesSelect.jsx';

const mapStateToProps = (state, { match }) => {
  const { path, params } = match;
  const { posts: { data: { byId } }, fetchingState } = state;

  const isEdited = /edit/gm.test(path);
  const post = isEdited ? byId[params.id] : null;
  return { isEdited, post, fetchingState };
}

const PostForm = ({
  history,
  isEdited,
  post,
  fetchingState,
  addPost,
  editPost,
}) => (fetchingState === true
    ? (<div className='loader' />)
    : (<div className='admin-form'>
        <Formik
          initialValues={{
            id: isEdited ? post._id : null,
            title: isEdited ? post.title : '',
            categories: isEdited ? post.categories : [],
            preview: isEdited ? post.preview : '',
            content: isEdited ? post.content : '',
            file: isEdited ? post.image : null,
            date: isEdited ? post.date : new Date(),
          }}

          validationSchema={Yup.object().shape({
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
          })}

      onSubmit={({
        id,
        title,
        categories,
        content,
        preview,
        file,
        date,
      }, {
        setSubmitting,
        resetForm
      }) => {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('title', title);
            formData.append('categories', JSON.stringify(categories));
            formData.append('preview', preview);
            formData.append('content', content);
            formData.append('date', date);
            isEdited ? editPost(id, { formData }) : addPost({ formData });
            setTimeout(() => history.push('/'), 500)
            resetForm();
            setSubmitting(false);
          }}
        >
      {({ errors, setFieldValue, setFieldTouched, touched, isSubmitting, values }) => {
        const hasTitleErrors = errors.title && touched.title;
        const hasCategoriesErrors = errors.categories && touched.categories;
        const hasPreviewErrors = errors.preview && touched.preview;
        const hasContentErrors = errors.content && touched.content;

        const titleCn = cn({
          'content-input': true,
          'error': hasTitleErrors,
        });
        const categoriesCn = cn({
          'error': hasCategoriesErrors,
        });
        const previewCn = cn({
          'content-input': true,
          'error': hasPreviewErrors,
        });
        const contentCn = cn({
          'content-input': true,
          'error': hasContentErrors,
        });

          return (
            <Form >
              <label htmlFor='file'>File upload</label>
              <Field name='file' component={FileUpload}/>

              <label htmlFor='title'>Title:</label>
              <Field type='text' name='title' className={titleCn}/>
              {hasTitleErrors && <div className='error-message'>{errors.title}</div>}

              <label htmlFor='categories'>Categories:</label>
              <Select
                name='categories'
                options={options}
                isMulti
                onChange={(value) => setFieldValue('categories', value)}
                onBlur={() => setFieldTouched('categories', true)}
                value={values.categories}
                className={categoriesCn}/>
              {hasCategoriesErrors && <div className='error-message'>{errors.categories}</div>}

              <label htmlFor='preview'>Preview:</label>
              <Field type='text' name='preview' as='textarea' rows='4' className={previewCn}/>
              {hasPreviewErrors && <div className='error-message'>{errors.preview}</div>}

              <label htmlFor='content'>Content:</label>
              <Field name='content' component={MarkDown} className={contentCn}/>
              {hasContentErrors && <div className='error-message'>{errors.content}</div>}

              <button type='submit' disabled={isSubmitting}>Add</button>
            </Form>
          )}}
        </Formik>

    </div>
    )
);

export default connect(mapStateToProps)(PostForm);
