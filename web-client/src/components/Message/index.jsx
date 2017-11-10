import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
  };

  render() {
    const { body, source, sentiment_score } = this.props.message;
    const goodSentiment = sentiment_score > 0 ? true : false;

    return (
      <div className={ `message ${goodSentiment ? 'good' : 'bad'}` }>
        <span>{ body }</span>
        <div className="message_source">{ source }</div>
      </div>
    );
  }
}

export default Message;
