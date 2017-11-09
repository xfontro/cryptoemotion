import React, { Component } from 'react';
import PropTypes from 'prop-types';


const EmotionBar = ({ value }) => {
  const width = { width: Math.round(80 * value) };

  return (
    <div className="emotion-bar" style={ width } />
  );
};

EmotionBar.propTypes = {
  value: PropTypes.number.isRequired,
};

export default EmotionBar;
  