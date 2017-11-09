require 'pry'

module CryptoEmotion
  module Detail
    class CryptoDetail < Grape::Entity
      root 'crypto_details', 'crypto_detail'
      expose :symbol, documentation: { type: :string, desc: 'token symbol' }
      expose :name, documentation: { type: :string, desc: 'crypto currency name' }
      expose :fear, documentation: { type: :string, desc: "level of 'fear, uncertainty, doubt'" }
      expose :anger, documentation: { type: :string, desc: "level of 'fear of missing out'" }
      expose :disgust, documentation: { type: :string, desc: "level of 'fear of missing out'" }
      expose :joy, documentation: { type: :string, desc: "level of 'fear of missing out'" }
      expose :sadness, documentation: { type: :string, desc: "level of 'fear of missing out'" }
      expose :sentiment_score, documentation: { type: :string, desc: "overall sentiment score." }
    end

    class API < Grape::API
      format :json
      namespace :details do
        desc 'Returns the the detailed information of the given crypto',
              params: CryptoEmotion::Detail::CryptoDetail.documentation,
              success: CryptoEmotion::Detail::CryptoDetail
        get ':id' do
          response = ::CryptoEmotion::CryptoDetailService.new(crypto_id: params[:id]).call
          present response.symbolize_keys, with: ::CryptoEmotion::Detail::CryptoDetail
        end
      end
    end
  end
end
