module CryptoEmotion
  class AggregateSentimentService
    def initialize(messages: "default message")
      @messages = messages
    end

    def call
      calculate_aggregate_sentiment
    end

    private

    def calculate_aggregate_sentiment
      nlp_sentiment = ::CryptoEmotion::SentimentService.new(messages: @messages).call
      watson_sentiment = ::CryptoEmotion::WatsonService.new(messages: @messages).call
      format_hash(nlp_sentiment, watson_sentiment)
    end

    def format_hash(nlp_sentiment, watson_sentiment)
      {
        sentiment_score: (((nlp_sentiment[:sentiment_score] + 1) + (watson_sentiment[:sentiment_score] + 1)) / 2) - 1,
        joy: watson_sentiment["joy"],
        fear: watson_sentiment["fear"],
        disgust: watson_sentiment["disgust"],
        sadness: watson_sentiment["sadness"],
        anger: watson_sentiment["anger"]
      }
    end
  end
end
