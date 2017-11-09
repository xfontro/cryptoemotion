require 'redd'
require 'pry'

module CryptoEmotion
  class SentimentService
    def initialize(messages:)
      @messages = messages
    end

    def call
      calculate_string_sentiment
    end

    def client

    end

    def calculate_string_sentiment
      scores = []
    end
  end
end
