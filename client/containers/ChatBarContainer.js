import * as actions from '../actions'
import ChatBar from '../components/ChatBar'
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message) => {
      dispatch(actions.sendMessage(message));
    }
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBar);
