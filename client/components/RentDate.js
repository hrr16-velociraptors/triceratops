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
    //added following line to see value of props
    console.log(this.props);
    this.props.attemptRentitem(data, this.props.item._id);
  };

  onToken(data, token){
    data.stripeToken = token;
    data.amount = this.props.item.price*100;
    console.log(data);
    this.props.onToken(data);
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

        <StripeCheckout
          token={this.onToken.bind(this)}
          allowRememberMe={false}
          componentClass="div"
          amount={this.props.item.price*100}
          stripeKey="pk_test_g30q1NSYR71zAPQs8yu4LVGS"
        >
          <RaisedButton className="myOwnButton" type="submit" label="Rent Now!" style={{float:'right'}}/>
        </StripeCheckout>
      </form>
    );
  }
}

export default RentDateComponent;
          // <RaisedButton className="myOwnButton" />
