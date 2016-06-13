import React from 'react';
import { Component } from 'react';
import ChatBar from '../containers/ChatBarContainer'
import ChatMessages from '../components/ChatMessages'

export default class Chat extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // make sure this function gets passed in from container
    this.props.chatSetup();
  }
  render () {
    return (
      <div>
      <button id="chatButton" onclick="chatDisplay();">Chat</button>
      <div className="chatBox">
      
        {/* make sure messages gets passed from store from container */}
        <ChatMessages messages={this.props.messages}/>
        <ChatBar />
        </div>
      </div>
    );
  }
}
