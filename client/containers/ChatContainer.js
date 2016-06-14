import * as actions from '../actions'
import Chat from '../components/Chat.js'
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    chatSetup: () => {
      dispatch(actions.chatSetup());
    }
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.chat
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
