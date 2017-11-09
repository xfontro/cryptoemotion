require 'redd'
require 'pry'
module CryptoEmotion
  class WatsonService
    WATSON_API_URL = 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27'.freeze

    def initialize(messages: "default message")
      @messages = messages
      @username = ENV['WATSON_USERNAME']
      @password = ENV['WATSON_PASSWORD']
    end

    def call
      calculate_watson_sentiment
    end

    private

    def calculate_watson_sentiment
      binding.pry
      response = api_call
    end

    def format_hash(response)
      {

      }
    end

    def payload
      {
        "text": @messages.join,
        "features": {
          "emotion": {},
          "sentiment": {}
        },
        "language": "en"
      }
      
    end

    def api_call
      RestClient::Request.execute(
        method: :post, url: WATSON_API_URL,
        user: @username, password: @password,
        payload: payload.to_json,
        :headers => { :content_type => "application/json", :accept => "application/json" }
      )
    end
  end
end