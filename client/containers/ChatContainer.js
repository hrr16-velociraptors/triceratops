import * as actions from '../actions.js'
import Chat from '../Chat.js'

const mapDispatchToProps = (dispatch) => {
  return {
    setUpChat: dispatch(actions.chatSetup());
  }
}

const mapStateToStore = (state) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
