module CryptoEmotion
  class HeaderVersioning < Grape::API
    version 'v1', using: :header, vendor: 'CryptoEmotion', format: :json, strict: true
    desc 'Returns CryptoEmotion.'
    get do
      { header: 'CryptoEmotion' }
    end
  end
end
