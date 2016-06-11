import * as actions from '../actions.js'
import ChatBar from '../ChatBar.js'

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message) => {
      dispatch(actions.sendMessage(message));
    }
  }
}

const mapStateToStore = (state) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBar);
