import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import ProfileComponent from '../components/Profile.js';
import { push } from 'react-router-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    redirectToLogin: () => {
      dispatch(push('/login'));
    },
    fetchUpdatedProducts: () => {
      dispatch(actions.fetchUpdatedProducts());
    },
    popupClose: () => {
      dispatch(actions.popupClose());
    },
    profileCardPopupClose: () => {
      dispatch(actions.profileCardPopupClose());
    },
    profileCardPopupOpen: (event) => {
      event.preventDefault();
      let target = event.currentTarget;
      dispatch(actions.profileCardPopupOpen(target)); 
    },
    profileCardHandleSubmit: (oldPass, newPass) => {
      let user = {
        oldPass: oldPass,
        newPass: newPass
      }
      dispatch(actions.attemptPasswordReset(user));
    }
  };
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    auth: state.auth,
    products: state.products,
    ui: state.ui
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
