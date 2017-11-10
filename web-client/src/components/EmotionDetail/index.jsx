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
};

export default EmotionDetail;
  