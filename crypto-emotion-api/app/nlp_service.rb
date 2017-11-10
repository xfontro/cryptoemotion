require 'redd'
require 'pry'
require 'rest-client'

module CryptoEmotion
  NLP_API_URL = 'http://nlp-api:9000/api/score'.freeze

  class SentimentService
    def initialize(messages:)
      @messages = messages
      @scores = []
    end

    def call
      response = api_call
      mean = scores_mean

      format_hash(mean)
    end
    
    private
    def api_call
      @messages.each do |message|
        res = RestClient.post NLP_API_URL, {'message' => message}.to_json, {content_type: :json, accept: :json}
        @scores << JSON[res.body]["compound"]
      end

      @scores
    end

    def scores_mean
      @scores.inject{ |sum, el| sum + el }.to_f / @scores.size
    end

    def format_hash(sentiment_score)
      {
        sentiment_score: sentiment_score,
        joy: 0,
        fear: 0,
        disgust: 0,
        sadness: 0,
        anger: 0
      }
    end
  end
end