module CryptoEmotion
  class API < Grape::API
    prefix 'api'
    format :json
    mount ::CryptoEmotion::Ping
    mount ::CryptoEmotion::HeaderVersioning
    mount ::CryptoEmotion::RescueFrom
    mount ::CryptoEmotion::List::API
    mount ::CryptoEmotion::Detail::API
    mount ::CryptoEmotion::LastMessage::API
    add_swagger_documentation api_version: 'v1'
  end
end
