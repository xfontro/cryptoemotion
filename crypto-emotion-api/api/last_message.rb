module CryptoEmotion
  module LastMessage
    class CryptoMessage < Grape::Entity
      root 'list_messages', 'last_message'
      expose :body,documentation: { type: :string, desc: "level of 'fear, uncertainty, doubt'" }
      expose :fear, documentation: { type: :string, desc: "level of 'fear, uncertainty, doubt'" }
      expose :anger, documentation: { type: :string, desc: "level of 'fear of missing out'" }
      expose :disgust, documentation: { type: :string, desc: "level of 'fear of missing out'" }
      expose :joy, documentation: { type: :string, desc: "level of 'fear of missing out'" }
      expose :sadness, documentation: { type: :string, desc: "level of 'fear of missing out'" }
      expose :sentiment_score, documentation: { type: :string, desc: "overall sentiment score." }
      expose :source, documentation: { type: :string, desc: "data source" }
    end

    class API < Grape::API
      format :json
      namespace :last_message do
        desc "Returns a last message",
              params: ::CryptoEmotion::LastMessage::CryptoMessage.documentation,
              success: ::CryptoEmotion::LastMessage::CryptoMessage
        get '/' do
          response = ::CryptoEmotion::AnalyzeAndStream.new.call
          present response, with: ::CryptoEmotion::LastMessage::CryptoMessage
        end
      end
    end
  end
end
