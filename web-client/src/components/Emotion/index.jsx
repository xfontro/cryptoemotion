import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { IMAGE_EMOTION } from 'staticdata';


const Emotion = ({ sadness, joy, anger, disgust, fear, sentimentScore }) => {
  const assetsUrl = '/assets/*.jpeg';

  const getImage = () => {
    const { name } =IMAGE_EMOTION.reduce((prev, curr) => {
      const diff = Math.abs(curr.sadness - sadness)
      + Math.abs(curr.joy - joy)
      + Math.abs(curr.anger - anger)
      + Math.abs(curr.disgust - disgust)
      + Math.abs(curr.fear - fear)
      + Math.abs(curr.sentimentScore - sentimentScore)/10;

      return prev.diff > diff ? { name: curr.name, diff } : prev;
    }, { name: '', diff: 9999.0 });

    return assetsUrl.replace('*', name);
  };

  const image = getImage();

  const style = image ? { backgroundImage: `url('${ image }')` } : {};

  return (
    <div className="emotion" style={ style } />
  );
};

Emotion.propTypes = {
  sadness: PropTypes.number.isRequired,
  joy: PropTypes.number.isRequired,
  anger: PropTypes.number.isRequired,
  disgust: PropTypes.number.isRequired,
  fear: PropTypes.number.isRequired,
  sentimentScore: PropTypes.number.isRequired,
};

export default Emotion;
