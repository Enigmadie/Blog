import { connect } from 'react-redux';
import { actions, asyncActions } from './slices';

export default (mapStateToProps) => (Component) => (
  connect(mapStateToProps, { ...actions, ...asyncActions })(Component)
);
