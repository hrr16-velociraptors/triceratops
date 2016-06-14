import * as actions from '../actions'
import Chat from '../components/Chat.js'
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    chatSetup: () => {
      dispatch(actions.chatSetup());
    },
    chatDisplay: () => {
      dispatch(actions.chatDisplay());
    }
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.chat,
    display: state.ui.chat
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
