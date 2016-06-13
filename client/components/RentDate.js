import React from 'react';
import { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
//added this line to import stripe checkout
import StripeCheckout from 'react-stripe-checkout';

class RentDateComponent extends Component {
  constructor(props){
    super(props);
  };

  attemptRentitem(data) {
    data.username = this.props.user.username;
    this.props.attemptRentitem(data, this.props.item._id);
  };
  onToken(token){
    data.stripeToken = token;
    this.props.onToken(data);
    //following xhr... is an example of a function
    // xhrStripeTokenToMyServer(token).then( => {
    //   // please do with HTTPS
    // });
  };

  render(){
    const { fields, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.attemptRentitem.bind(this))}>
        <DatePicker
          autoOk={true}
          style={{width:'60%',float:'left'}}
          hintText="Pick a date..."
          onChange={(x, event) => fields.date.onChange(event)}
          minDate={new Date(this.props.item.availableFrom)}
          maxDate={new Date(this.props.item.availableTo)}
          shouldDisableDate={(date) => {
            return this.props.disableDate.indexOf(date.toString()) !== -1;
          }}
        />
        <RaisedButton type="submit" label="Confirm Rental Date" style={{float:'right'}} />

        <StripeCheckout
          token={this.onToken}
          allowRememberMe={false}
          stripeKey="pk_test_g30q1NSYR71zAPQs8yu4LVGS" />
      </form>
    );
  }
}

export default RentDateComponent;
