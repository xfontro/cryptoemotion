import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EmotionBar from 'components/EmotionBar';

const EmotionDetail = ({ joy, sadness, anger, disgust, fear }) => {
  return (
    <div className="emotionDetail">
      <ul>
        <li>
          <EmotionBar value={ sadness } />
          <b>{ Math.round(sadness * 100) / 100 }</b>
          sadness
        </li>
        <li>
          <EmotionBar value={ joy } />
          <b>{ Math.round(joy * 100) / 100 }</b>
          joy
        </li>
        <li>
          <EmotionBar value={ anger } />
          <b>{ Math.round(anger * 100) / 100 }</b>
          anger
        </li>
        <li>
          <EmotionBar value={ disgust } />
          <b>{ Math.round(disgust * 100) / 100 }</b>
          disgust
        </li>
        <li>
          <EmotionBar value={ fear } />
          <b>{ Math.round(fear * 100) / 100 }</b>
          fear
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
};

export default EmotionDetail;
  