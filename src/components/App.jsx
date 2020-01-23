import React from 'react';
import { connect } from 'react-redux';
import Banner from './Banner.jsx';
import Posts from './Posts.jsx';
import PostCreator from './PostCreator';
import Post from './Post.jsx';

const modeSelection = {
  filling: <PostCreator />,
  base: <Posts />,
  post: <Post />,
}
const mapStateToProps = state => {
  const { mode } = state;
  return { mode };
};

class App extends React.Component {
  render() {
    const { mode } = this.props;
    return <>
      <Banner />
      <div className='blog-content'>
        {modeSelection[mode]}
      </div>
    </>
  }
};

export default connect(mapStateToProps)(App);
