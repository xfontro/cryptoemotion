require 'redd'
require 'pry'

module CryptoEmotion
  class CryptoDetailService
    CRYPTO_ID_TO_SUBREDDIT = {
      'eth' => 'ethtrader',
      'btc' => 'bitcoinmarkets',
      'ltc' => 'litecoin',
      'neo' => 'neo'
    }.freeze

    def initialize(crypto_id: 'eth')
      @crypto_id = crypto_id
    end

    def call
      return_crypto_detail
    end

    private

    def return_crypto_detail
      reddit_messages = ::CryptoEmotion::RedditService.new(subreddit_name: subreddit_name).call
      score = ::CryptoEmotion::WatsonService.new(messages: reddit_messages).call
      #score = ::CryptoEmotion::SentimentService.new(messages: reddit_messages).call
      update_crypto_detail(symbol: @crypto_id, sentiment_score: score)
      cripto_detail_hash(symbol: @crypto_id, sentiment_score: score)
    end

    def subreddit_name
      CRYPTO_ID_TO_SUBREDDIT[@crypto_id]
    end

    def cripto_detail_hash(symbol:, sentiment_score:)
      {
        symbol: symbol,
        sentiment_score: sentiment_score
      }
    end

    def update_crypto_detail(symbol:, sentiment_score:)
      ::CryptoEmotion::CryptoListService.new.update(symbol: @crypto_id, sentiment_score: sentiment_score)
    end
  end
end
