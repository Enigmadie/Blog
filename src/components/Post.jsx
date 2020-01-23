import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { activePost } = state;
  return { activePost };
};

class Post extends React.Component {
  render() {
    const { activePost } = this.props;
    const imgHref = `http://localhost:8080${activePost.image}`
    return (
    <div>
      <h1>{activePost.title}</h1>
      <img src={imgHref} />
      <p>{activePost.content}</p>
    </div>
    );
  }
}

export default connect(mapStateToProps)(Post)
