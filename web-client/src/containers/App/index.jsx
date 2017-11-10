import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MarketCoinActions from 'datamodel/MarketCoin/actions';
import MessageActions from 'datamodel/Message/actions';

import CoinList from 'components/CoinList';
import Loader from 'components/Loader';
import Header from 'components/Header';
import Particles from 'components/Particles';
import Footer from 'components/Footer';
import Message from 'components/Message';

import 'styles/style';
import 'styles/icons.css';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetchingCoins: PropTypes.bool.isRequired,
    fetchingEmotions: PropTypes.bool.isRequired,
    coins: PropTypes.array.isRequired,
    message: PropTypes.object,
  }

  static defaultProps = {
    message: null,
  }

  constructor(props) {
    super(props);

    this.actions = bindActionCreators({ ...MarketCoinActions, ...MessageActions }, props.dispatch);
  }

  componentWillMount() {
    this.actions.getCoins();
  }

  componentDidMount() {
    setInterval(() => {
      this.actions.getMessage();
    }, 5000);
  }

  componentWillReceiveProps(nextProps) {
    const { error, fetchingCoins } = this.props;
    if (nextProps.error) {
      console.log('Woops! Error:', error.message);
    }
    else if (fetchingCoins && !nextProps.fetchingCoins) {
      this.actions.getEmotions();
    }
  }

  render() {
    const { fetchingCoins, fetchingEmotions, coins, message } = this.props;

    return (
      <div>
        <Particles type="default" />
        <Header />
        { message && <Message message={ message } /> }
        { fetchingCoins || fetchingEmotions
          ? <Loader />
          : [<CoinList coins={ coins } key="coins" />, <Footer key="footer" />]
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    coins: state.MarketCoin.coins,
    fetchingCoins: state.MarketCoin.fetchingCoins,
    fetchingEmotions: state.MarketCoin.fetchingEmotions,
    message: state.Message.message,
  }),
)(App);
