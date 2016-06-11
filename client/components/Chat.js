import React from 'react';
import { Component } from 'react';
import ChatBar from '../containers/ChatBarContainer'

export default class Chat extends Component {
  constructor() {
    super(props)
  }
  componentDidMount() {
    // make sure this function gets passed in from container
    this.props.setupChat();
  }
  render () {
    return (
      <div>
        {/* make sure messages gets passed from store from container */}
        <ChatMessages messages={this.props.messages}/>
        <ChatBar />
      </div>
    );
  }
}
