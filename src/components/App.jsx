import React from 'react';
import { connect } from 'react-redux';
import Banner from './Banner.jsx';
import Posts from './Posts.jsx';
import PostCreator from './PostCreator';

const modeSelection = {
  post: <PostCreator />,
  base: <Posts />
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
