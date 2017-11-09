require 'redd'
require 'pry'
require 'rest-client'

module CryptoEmotion
  class SentimentService
    def initialize(messages:)
      @messages = messages
      @scores = []
    end

    def call
      crypto_score
    end

    private

    def crypto_score
      calculate_strings_sentiment_scores
      scores_mean
    end

    def calculate_strings_sentiment_scores
      @messages.each do |message|
        res = RestClient.post "http://nlp-api:9000/api/score", {'message' => message}.to_json, {content_type: :json, accept: :json}
        @scores << JSON[res.body]["compound"]
      end

      @scores
    end

    def scores_mean
      @scores.inject{ |sum, el| sum + el }.to_f / @scores.size
    end
  end
end
