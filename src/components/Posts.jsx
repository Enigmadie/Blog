import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as actions from '../actions';
import FileUpload from './FileUpload.jsx'

const mapStateToProps = state => state;
const actionCreators = {
  addPost: actions.addPost,
};

class Posts extends React.Component {
  render() {
    const reader = new FileReader();
    return (
      <div className='admin-form'>
        <Formik
          initialValues={{
            title: '',
            content: '',
            file: '',
          }}
          onSubmit={({ title, content, file }, { setSubmitting, resetForm }) => {
            const { addPost } = this.props;
            addPost({
              title,
              content,
              file,
            });
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <label>Topic</label>
              <Field type='text' name='title' />
              <label>File upload</label>
              <Field name='file' component={FileUpload}/>
              <label>Content</label>
              <Field type='text' name='content' />
              <button type='submit' disabled={isSubmitting}>Add</button>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(Posts);
