import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import ProfileCard from './ProfileCard.js';


class ProfileComponent extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount() {
    if(!this.props.auth.isAuthenticated) {
      return this.props.redirectToLogin();
    } else {
      this.props.fetchUpdatedProducts();
    }
  }

  render(){

  const { user, products, ui } = this.props;

    return (
      <div>
        <ProfileCard
          cardType={'profile'}
          user={user}
          ui={ui}
          popupClose={this.props.popupClose}
          profileCardPopupClose={this.props.profileCardPopupClose}
          profileCardPopupOpen={this.props.profileCardPopupOpen}
          profileCardHandleSubmit={this.props.profileCardHandleSubmit}
        />
        <ProfileCard
          cardType={'listings'}
          user={user}
          products={products}
        />
        <ProfileCard
          cardType="rentals"
          expanded={false}
          user={user}
          products={products}
        />
      </div>
      );
  }
}

export default ProfileComponent;
