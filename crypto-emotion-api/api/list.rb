module CryptoEmotion
  module List
    class CryptoLightWeight < Grape::Entity
      root 'list_cryptos', 'list_crypto'
      expose :id
      expose :erc_20, documentation: { type: :boolean, desc: 'ethereum token?' }
      expose :symbol, documentation: { type: :string, desc: 'crypto symbol' }
      expose :name, documentation: { type: :string, desc: 'crypto name' }
      expose :fear, documentation: { type: :string, desc: "level of 'fear, uncertainty, doubt'" }
      expose :anger, documentation: { type: :string, desc: "level of 'fear of missing out'" }
      expose :disgust, documentation: { type: :string, desc: "level of 'fear of missing out'" }
      expose :joy, documentation: { type: :string, desc: "level of 'fear of missing out'" }
      expose :sadness, documentation: { type: :string, desc: "level of 'fear of missing out'" }
      expose :sentiment_score, documentation: { type: :string, desc: "overall sentiment score." }
      expose :keywords, documentation: { type: :string, desc: "flagged keywords." }
    end

    class API < Grape::API
      format :json
      namespace :list do
        desc "Returns a list of valid crypto's",
              params: ::CryptoEmotion::List::CryptoLightWeight.documentation,
              success: ::CryptoEmotion::List::CryptoLightWeight
        get '/' do
          response = ::CryptoEmotion::CryptoListService.new.read
          present response, with: ::CryptoEmotion::List::CryptoLightWeight
        end
      end
    end
  end
end
