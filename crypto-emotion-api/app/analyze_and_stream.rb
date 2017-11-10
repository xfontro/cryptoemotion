require 'redd'
require 'pry'

module CryptoEmotion
  class AnalyzeAndStream
    def initialize
    end

    def call
      stream
    end

    private

    def random_symbol
      ["eth", "btc", "ltc", "neo"]
    end

    def stream
      @subreddit = ::CryptoEmotion::CoinConstants.for(symbol: random_symbol.sample)[:subreddit]
      comment = reddit_client.subreddit(@subreddit).comments({limit: 1}).children.first
      if comment.respond_to?(:body)
        watson_response = ::CryptoEmotion::WatsonService.new(messages: [comment.body]).call
        response = response_hash(comment.body,watson_response)
        puts response
        response
      end
    end

    def response_hash(body,watson_response)
      {
        body: body,
        source: @subreddit
      }.merge(watson_response)
    end

    def reddit_client
      @reddit_client ||= Redd.it(
        user_agent: 'Hackathon Alpha',
        client_id:  'Z_AwQflOiSKlVQ',
        secret:     'IyrqLSS611v7qhpI_cXxk2ljoho'
      )
    end
  end
end
