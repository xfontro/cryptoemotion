import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EmotionBar from 'components/EmotionBar';

const EmotionDetail = (props) => {
  const emotions = ['joy', 'sadness', 'anger', 'disgust', 'fear'];

  return (
    <div className="emotionDetail">
      <ul>
        {
          emotions.map(emotion => (
            <li className={ emotion } key={ emotion }>
              <EmotionBar emotion={ emotion } value={ props[emotion] } />
              { emotion }
            </li>
          ))
        }
        <li className="emotion-source">
          <a href={ `https://www.reddit.com/${props.source}` }>{ props.source }</a>
          <span>Last 24h</span>
        </li>	
      </ul> 
    </div>
  );
};

EmotionDetail.propTypes = {
  joy: PropTypes.number.isRequired,
  sadness: PropTypes.number.isRequired,
  anger: PropTypes.number.isRequired,
  disgust: PropTypes.number.isRequired,
  fear: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
};

export default EmotionDetail;
  