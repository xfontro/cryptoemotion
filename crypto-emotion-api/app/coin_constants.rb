module CryptoEmotion
  module CoinConstants
    CRYPTO_CONSTANT = {
      'eth' => { name:'ethereum', subreddit: 'ethtrader' },
      'btc' => { name: 'bitcoin', subreddit: 'bitcoinmarkets'},
      'ltc' => { name: 'litecoin', subreddit: 'litecoin'},
      'neo' => { name: 'neo', subreddit: 'neo'},
      'elix' => { name: 'elixir', subreddit: 'elixirtoken'},
      'wtc' => { name: 'walton', subreddit: 'waltonchain'},
      'req' => { name: 'req', subreddit: 'requestnetwork'},
      'ark' => { name: 'ark', subreddit: 'arkecosystem'},
      'omg' => { name: 'omg', subreddit: 'omise_go'},
      'xrp' => { name: 'ripple', subreddit: 'ripple'},
      'dash' => { name: 'dash', subreddit: 'dashpay'},
      'xem' => { name: 'nem', subreddit: 'nem'},
      'xmr' => { name: 'monero', subreddit: 'monero'},
      'miota' => { name: 'iota', subreddit: 'iota'},
      'gnt' => { name: 'golem', subreddit: 'golemproject'}
    }.freeze

    def self.for(symbol: )
      CRYPTO_CONSTANT[symbol]
    end
  end
end
