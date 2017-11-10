import React, { Component } from 'react';
import PropTypes from 'prop-types';


const EmotionBar = ({ emotion, value }) => {
  const width = { width: Math.round(80 * value) };

  return (
    <div className="emotion-bar">
      <div className={ emotion } style={ width } />
      <b>{ Math.round(value * 100) / 100 }</b>
    </div>
  );
};

EmotionBar.propTypes = {
  value: PropTypes.number.isRequired,
  emotion: PropTypes.string.isRequired,
};

export default EmotionBar;
  