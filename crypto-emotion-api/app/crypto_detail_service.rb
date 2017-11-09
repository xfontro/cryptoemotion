require 'redd'
require 'pry'


module CryptoEmotion
  class CryptoDetailService
    CRYPTO_ID_TO_SUBREDDIT = {
      'eth' => 'ethereum'
    }
    def initialize(crypto_id: 'eth')
      @crypto_id = crypto_id
    end

    def call
      calculate_sentiment
    end

    private

    def calculate_sentiment
      reddit_messages = ::CryptoEmotion::RedditService.new(subreddit_name: subreddit_name).call
      ::CryptoEmotion::SentimentService.new(messages: reddit_messages).call
    end

    def subreddit_name
      CRYPTO_ID_TO_SUBREDDIT[@crypto_id]
    end
  end
end
