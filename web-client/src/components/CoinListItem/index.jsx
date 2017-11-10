import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Emotion from 'components/Emotion';
import EmotionDetail from 'components/EmotionDetail';

class CoinListItem extends Component {
  static propTypes = {
    volumeUsd24h: PropTypes.number.isRequired,
    availableSupply: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    lastUpdated: PropTypes.object.isRequired,
    marketCapUsd: PropTypes.number.isRequired,
    maxSupply: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    percentChange1h: PropTypes.number.isRequired,
    percentChange7d: PropTypes.number.isRequired,
    percentChange24h: PropTypes.number.isRequired,
    priceBtc: PropTypes.number.isRequired,
    priceUsd: PropTypes.number.isRequired,
    rank: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    totalSupply: PropTypes.number.isRequired,
    chart: PropTypes.string,
    emotion: PropTypes.object,
  };

  static defaultProps = {
    emotion: null,
  };

  getMainEmotion(emotions) {
    if (!emotions) return '';

    const emotion = Object.keys(emotions).reduce((prev, curr) => {
      const val = emotions[curr];

      if (typeof val !== 'number' || curr === 'sentimentScore') {
        return prev;
      }

      return val > prev.val ? { name: curr, val } : prev;
    }, { name: '', val: 0 });
    return emotion.name;
  }

  render() {
    const {
      chart,
      emotion,
      id,
      name,
      percentChange1h,
      percentChange24h,
      priceBtc,
      priceUsd,
      symbol,
    } = this.props;

    const logoClassName = `s-s-${name.toLowerCase().replace(/ /g,'-')} currency-logo-sprite`;


    return (
      <div className="plan">
        <h3 className={ this.getMainEmotion(emotion) }>
          { name }
          <div className={ logoClassName } />
          { emotion && <Emotion { ...emotion } /> }
        </h3>
        <span>${ priceUsd }</span>
        <div className="plan-opened">
          { emotion && <EmotionDetail { ...emotion } /> }
        </div> 
        <ul>
          <li><b>{ priceBtc }</b> btc price</li>
          <li><b>{ percentChange1h }%</b> Percentage in 1h</li>
          <li><b>{ percentChange24h }%</b> Percentage in 24h</li>
			    <li><img src={ chart } alt={ name }/></li>			
        </ul> 
      </div>
    );
  }
}

export default CoinListItem;
