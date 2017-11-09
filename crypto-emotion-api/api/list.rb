module CryptoEmotion
  module List
    class CryptoLightWeight < Grape::Entity
      root 'list_cryptos', 'list_crypto'
      expose :id
      expose :erc_20, documentation: { type: :boolean, desc: 'ethereum token?' }
      expose :symbol, documentation: { type: :string, desc: 'token symbol' }
      expose :name, documentation: { type: :string, desc: 'crypto currency name' }
    end

    class API < Grape::API
      format :json
      namespace :list do
        desc "Returns a list of valid crypto's",
              params: ::CryptoEmotion::List::CryptoLightWeight.documentation,
              success: ::CryptoEmotion::List::CryptoLightWeight
        get '/' do
          response = [OpenStruct.new(name: 'ethereum'),OpenStruct.new(name: 'bitcoin')]
          present response, with: ::CryptoEmotion::List::CryptoLightWeight
        end
      end
    end
  end
end
