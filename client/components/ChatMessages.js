import React from 'react';
import { Component } from 'react';

export default class ChatMessages extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.messages.map(m => (
          <div key={m.id}>
            {m.text}
          </div>
        ))}
      </div>
    );
  }
}
