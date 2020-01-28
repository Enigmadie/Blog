import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, { match }) => {
  console.log(state)
  const { posts: { byId }, dataFetchingFromServerState  } = state;
  const activePostId = match.params.id;
  const activePost = dataFetchingFromServerState === 'finished' ? byId[activePostId] : {};
  return { activePost, dataFetchingFromServerState  };
};

class Post extends React.Component {
  render() {
    const { activePost, dataFetchingFromServerState } = this.props;
    const imgHref = `http://localhost:8080${activePost.image}`
    if (dataFetchingFromServerState === 'requested' ) {
      return <div className='loader'/>
    }
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
