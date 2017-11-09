module CryptoEmotion
  class PathVersioning < Grape::API
    version 'vendor', using: :path, vendor: 'CryptoEmotion', format: :json
    desc 'Returns CryptoEmotion.'
    get do
      { path: 'CryptoEmotion' }
    end
  end
end
