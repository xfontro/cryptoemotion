require 'redd'

module CryptoEmotion
  class WatsonService
    WATSON_API_URL = 'url'.freeze

    def initialize(messages: "default message")
      @messages = messages
    end

    def call
      calculate_watson_sentiment
    end

    private

    def calculate_watson_sentiment
      response = api_call
    end

    def format_hash(response)
      {

      }
    end

    def payload
      @messages.flatten!
    end

    def api_call
      RestClient.post WATSON_API_URL, payload.to_json, { content_type: :json, accept: :json }
    end
  end
end
