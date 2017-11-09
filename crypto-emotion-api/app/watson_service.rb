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
      response = api_call
      format_hash(JSON.parse(response))
    end

    def format_hash(response)
      {
        sentiment_score: response["sentiment"]["document"]["score"],
        joy: response["emotion"]["document"]["emotion"]["joy"],
        fear: response["emotion"]["document"]["emotion"]["fear"],
        disgust: response["emotion"]["document"]["emotion"]["disgust"],
        sadness: response["emotion"]["document"]["emotion"]["sadness"],
        anger: response["emotion"]["document"]["emotion"]["anger"]
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
