import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {}
};

class App extends React.Component {
  render() {
    return (
      <div className="test">TEST</div>
    );
  }
}

export default connect(mapStateToProps)(App);
