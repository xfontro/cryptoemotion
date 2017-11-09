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
      detailed_hash = ::CryptoEmotion::WatsonService.new(messages: reddit_messages).call

      update_and_return_crypto_detail(symbol: @crypto_id, detailed_hash: detailed_hash)
    end

    def subreddit_name
      CRYPTO_ID_TO_SUBREDDIT[@crypto_id]
    end

    def update_and_return_crypto_detail(symbol:, detailed_hash:)
      ::CryptoEmotion::CryptoListService.new.update(symbol: @crypto_id, detailed_hash: detailed_hash)
    end
  end
end
