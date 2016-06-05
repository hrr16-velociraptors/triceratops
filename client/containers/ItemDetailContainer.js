import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import ItemDetailComponent from '../components/ItemDetail.js';
import { push } from 'react-router-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    redirectToLogin: () => {
      dispatch(push('/login'));
    },
    fetchUpdatedProducts: (id) => {
      dispatch(actions.fetchUpdatedProducts(id));
    },
    popupClose: () => {
      dispatch(actions.popupClose());
    }
  };
};

const mapStateToProps = function(state){
  return {
    item: state.products.detail.item,
    user: state.user,
    auth: state.auth,
    ui: state.ui
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailComponent);
