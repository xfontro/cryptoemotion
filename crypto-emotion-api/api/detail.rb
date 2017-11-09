require 'pry'

module CryptoEmotion
  module Detail
    class CryptoDetail < Grape::Entity
      root 'crypto_details', 'crypto_detail'
      expose :id
      expose :erc_20, documentation: { type: :boolean, desc: 'ethereum token?' }
      expose :symbol, documentation: { type: :string, desc: 'token symbol' }
      expose :name, documentation: { type: :string, desc: 'crypto currency name' }
      expose :fud_level, documentation: { type: :string, desc: "level of 'fear, uncertainty, doubt'" }
      expose :fomo_level, documentation: { type: :string, desc: "level of 'fear of missing out'" }
      expose :overall_sentiment, documentation: { type: :string, desc: "overall sentiment score, the higher the better." }
    end
    class API < Grape::API
      format :json
      namespace :details do
        desc 'Returns the the detailed information of the given crypto',
              params: CryptoEmotion::Detail::CryptoDetail.documentation,
              success: CryptoEmotion::Detail::CryptoDetail
        get ':id' do
          response = ::CryptoEmotion::CryptoDetailService.new(crypto_id: params[:id]).call
          # present response, with: ::CryptoEmotion::Detail::CryptoDetail
        end
      end
    end
  end
end
