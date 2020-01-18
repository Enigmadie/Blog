import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as actions from '../actions';
import FileUpload from './FileUpload.jsx'

const mapStateToProps = state => {
  const props = {
    posts: state.posts,
  };
  return props;
};

      const actionCreators = {
  addPost: actions.addPost,
};

class Posts extends React.Component {
  render() {
    const { posts } = this.props;
    return (
      <>
      <div className='posts'>
      {posts.map((post, id) => {
        // const reader = new FileReader();
        // const test = reader.readAsDataURL(post.file);
        // console.log(test)
        return <div key={id}>
        <img src={post.file}></img>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>}
      )}
      </div>

      <div className='admin-form'>
        <Formik
          initialValues={{
            title: '',
            content: '',
            file: '',
          }}
          onSubmit={({ title, content, file }, { setSubmitting, resetForm }) => {
            const { addPost } = this.props;
            console.log(file)
            addPost({
              title,
              content,
              file,
            });
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form encType='multipart/form-data'>
              <label>File upload</label>
              <Field name='file' component={FileUpload}/>
              <label>Topic:</label>
              <Field type='text' name='title' />
              <label>Content:</label>
              <Field type='text' name='content' />
              <button type='submit' disabled={isSubmitting}>Add</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(Posts);
