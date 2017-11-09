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
      @messages.each do |message|
        res = RestClient.post "http://nlp-api:9000/api/score", {'message' => message}.to_json, {content_type: :json, accept: :json}
        @scores << JSON[res.body]["compound"]
      end

      calculate_string_sentiment
    end
    
    private
    def calculate_string_sentiment
      @scores
    end
  end
end
