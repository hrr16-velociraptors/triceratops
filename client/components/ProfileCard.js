import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import { Popover, PopoverAnimationDefault } from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class ProfileCard extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }
  
  handleOldPasswordChange(event){
    this.setState({
      oldPassword: event.target.value
    })
  }
  handleNewPasswordChange(event){
    this.setState({
      newPassword: event.target.value
    })
  }
  handleSubmit(event){
    event.preventDefault();
    this.props.profileCardHandleSubmit(this.state.oldPassword, this.state.newPassword);
    this.setState({
      oldPassword: '',
      newPassword: ''
    })
  }

  renderProfile(){
    if(this.props.cardType === "profile"){
      return (
        <Card className="profileCards" initiallyExpanded={false}>
          <CardHeader
            title={"Profile"}
            subtitle={"Edit email, password ..."}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true} style={{paddingTop: 0, paddingBottom: 0}}>
            {this.props.cardType === "profile"}
            <p><strong>Username:</strong> {this.props.user.username}</p>
            <p><strong>Email:</strong> {this.props.user.email}</p>
          </CardText>
          <CardActions expandable={true} style={{paddingTop: 0}}>
            <FlatButton 
              onTouchTap={this.props.profileCardPopupOpen} 
              label={"Reset your password"} 
            />
            <Popover
              open={this.props.ui.profileCardPopup.open}
              anchorEl={this.props.ui.profileCardPopup.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.props.profileCardPopupClose}
            >
              <form onSubmit={this.handleSubmit.bind(this)} autocomplete="off">
                <div class="form-group">
                  <div class="col-md-10">
                    <TextField 
                      type="password" 
                      className="form-control" 
                      id="oldPassword" 
                      value={this.state.oldPassword}
                      placeholder="Current Password"
                      onChange={this.handleOldPasswordChange.bind(this)}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-10">
                    <TextField 
                      type="password" 
                      className="form-control" 
                      id="newPassword" 
                      value={this.state.newPassword} 
                      placeholder="New Password" 
                      onChange={this.handleNewPasswordChange.bind(this)}
                    />
                  </div>
                </div>
                <RaisedButton class="btn btn-success-outline" type="submit" label="Change Password" />
              </form>
            </Popover>
            <Dialog
              actions={
                <FlatButton
                  label="OK"
                  primary={true}
                  onClick={this.props.popupClose}
                />
              }
              modal={false}
              open={this.props.ui.popup.open}
              onRequestClose={this.props.popupClose}
            >
              {this.props.ui.popup.content}
            </Dialog>
          </CardActions>
        </Card>
      )
    }
  }

  renderListings(){
    if(this.props.cardType === 'listings'){
      return (
        <Card className="profileCards" initiallyExpanded={this.props.expanded}>
          <CardHeader
            title={"Your Listings"}
            subtitle={"View and manage your listings"}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true} style={{paddingTop: 0, paddingBottom: 0}}>
            {
              this.props.products.items.filter(item => {
                return item.author === this.props.user.username;
              }).map(item => {
                return (

                  <Link to={"/listings/" + item._id}>
                    <ListItem
                      key={item._id}
                      primaryText={item.title}
                      secondaryText={"$"+item.price + " - " + item.summary}
                    />
                  </Link>
                )
              })
            }
          </CardText>
          <CardActions expandable={true} style={{paddingTop: 0}}>
            <Link to={"/Manage/"}>
              <FlatButton label={"Manage your listings"} />
            </Link>
          </CardActions>
        </Card>
      )
    }
  }


  renderRentals(){
    if(this.props.cardType === "rentals"){
      return (
        <Card className="profileCards" initiallyExpanded={this.props.expanded}>
          <CardHeader
            title={"Upcoming Rentals"}
            subtitle={"Check out the details of your upcoming rentals"}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true} style={{paddingTop: 0, paddingBottom: 0}}>
            {
              this.props.products.items.filter(item => {
                return item.rentSchedule.length === 0 ? false : item.rentSchedule[0].username === this.props.user.username;
              }).map(item => {
                return (
                  <Link to={"/listings/" + item._id}>
                    <ListItem
                      key={item._id}
                      primaryText={item.title}
                      secondaryText={"$"+item.price + " - " + item.summary}
                    />
                  </Link>
                )
              })
            }
          </CardText>
          <CardActions expandable={true} style={{paddingTop: 0}}>
          </CardActions>
        </Card>
      )
    }
  }
  render(){
    return(
      <div>
        <div>
          {this.renderProfile()}
        </div>
        <div>
          {this.renderListings()}
        </div>
        <div>
          {this.renderRentals()}
        </div>
      </div>
    )

  }
};
