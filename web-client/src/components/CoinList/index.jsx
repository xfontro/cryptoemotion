import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CoinListItem from 'components/CoinListItem';

const CoinList = ({ coins }) => {
  return (
    <div id="pricing-table" className="clear">
      { coins.map(coin => <CoinListItem key={ coin.id } { ...coin } />) }
    </div>
  );
};

CoinList.propTypes = {
  coins: PropTypes.array.isRequired,
};

export default CoinList;
